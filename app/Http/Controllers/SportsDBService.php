<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use garethp\ews\API;
use garethp\ews\API\Enumeration\ItemClassType;
use garethp\ews\API\Enumeration\DefaultShapeNamesType;
use Spatie\FlareClient\Api as FlareClientApi;

class SportsDBService extends Controller
{
    function getCountryFlag($nombre) {
        $countryIsoCodes = array(
            'Argentina' => 'AR',
            'Spain' => 'ES',
            'Slovenia' => 'SI'
        );
        // URL del servicio web SOAP
        $url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';
    
        // Contenido de la solicitud SOAP
        $xmlRequest = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <CountryFlag xmlns="http://www.oorsprong.org/websamples.countryinfo">
            <sCountryISOCode>$countryIsoCodes[$nombre]</sCountryISOCode>
            </CountryFlag>
        </soap:Body>
        </soap:Envelope>
        XML;
    
        // Configura la solicitud cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlRequest);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
        // Realiza la solicitud cURL
        $response = curl_exec($ch);
    
        // Cierra la sesión cURL
        curl_close($ch);
    
        // Procesa la respuesta SOAP
        $xmlResponse = simplexml_load_string($response);

        // Extrae la URL de la bandera
        $flagUrl = (string)$xmlResponse->children('soap', true)
            ->Body->children('m', true)->CountryFlagResponse
            ->CountryFlagResult;

        return $flagUrl;
    }
    

    public function getPlayerInfo(string $playerName){

        $baseUrl = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php';

        // Realizar la solicitud GET con el nombre del jugador como parámetro
        $response = Http::get($baseUrl, ['p' => $playerName]);

        $urlFlag = $this->getCountryFlag($response['player'][0]['strNationality']);

        // Verificar si la respuesta es exitosa y contiene datos del jugador
        if ($response->successful() && isset($response['player'][0])) {
            return Inertia::render('Jugadores/getplayerinfo', [
                'playerData'=>$response['player'][0],
                'user'=>Auth::user(),
                'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
                'urlFlag'=>$urlFlag,
            ]);
        }else{

            return Inertia::render('Jugadores/getplayerinfo', [
                'playerData'=> null,
            ]);  // Retorna null si no se encontraron datos o si ocurrió un error
        }
    }
}