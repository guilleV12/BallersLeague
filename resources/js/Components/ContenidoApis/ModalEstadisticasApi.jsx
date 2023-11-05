import React from 'react'
import { BotonContenido } from '../BotonesAcciones';

export const ModalEstadisticasApi = ({
closeModal,
partido
}) => {
  return (
     <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[75] bg-black opacity-50"></div>
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full shadow-lg border-black border rounded-lg z-[80] w-[80%]`}>
        <div className="bg-gray-100 w-full max-h-full rounded-l-lg overflow-y-auto">
            <div className='w-full flex bg-orange-500 justify-center items-center py-5 text-lg font-bold text-white'>
                Estadisticas
            </div>
            <div className={`border rounded-lg shadow-xl p-5`}>
                <table className="w-full border border-separate border-black rounded-lg p-5 bg-white">
                    <thead>
                        <tr>
                        <th className="text-left text-lg font-bold border-b" colSpan="2">Resumen del Partido</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="text-base font-bold">Temporada:</td>
                        <td className="text-base">{partido.season}.</td>
                        </tr>
                        <tr>
                        <td className="text-base font-bold">Fecha:</td>
                        <td className="text-base">{partido.date.split('T')[0]}.</td>
                        </tr>
                        <tr>
                        <td className="text-base font-bold">Postemporada:</td>
                        <td className="text-base">{partido.postseason === true?'Si':'No'}.</td>
                        </tr>
                        <tr>
                        <td className="text-base font-bold">Estado:</td>
                        <td className="text-base">{partido.status==='Final'?'Finalizado':'En juego'}.</td>
                        </tr>
                    </tbody>
                </table>
                <table className="w-full border border-separate border-black rounded-lg p-5 mt-3 bg-white">
                    <thead>
                        <tr>
                            <th className="text-left text-lg font-bold border-b" colSpan="6">Resultado del Partido</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-base font-bold border-r">{partido.home_team.full_name}</th>
                            <th className="text-base font-bold">{partido.home_team_score}</th>
                            <th className=''>vs</th>
                            <th className="text-base font-bold">{partido.visitor_team_score}</th>
                            <th className="text-base font-bold border-r">{partido.visitor_team.full_name}</th>
                        </tr>
                    </tbody>
                </table>
                    <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <BotonContenido
                                onClick={closeModal}
                                nombre={'Cerrar'}
                                />
                    </div>
            </div>
      </div>
    </div>
    </>
  )
}
export default ModalEstadisticasApi;