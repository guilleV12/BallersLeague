import React, { useEffect, useState } from 'react'
import vsLogo from '../Images/vs.png';
import { BotonContenido } from '../BotonesAcciones';

export const ModalVerEstadisticas = ({ patrocinadorConPrioridad, partidosPlayoffs, esPlayoff, users, partidos, fechaPartidoVer, setShowAlert, setTituloAlert, closeModalVerEstadisticas, equipos, jugadores, jugadorPartido, arbitros }) => {
  const [partidoActual, setPartidoActual] = useState('');
  const [equipo1, setEquipo1] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [equipoGanador, setEquipoGanador] = useState('');
  const [equipoPerdedor, setEquipoPerdedor] = useState('');
  const [userArbitro1, setUserArbitro1] = useState('');
  const [userArbitro2,setUserArbitro2] = useState('');

  useEffect(() => {
    if (fechaPartidoVer && partidos) {
      // Buscar el partido en la lista de partidos
      const partidoEncontrado = esPlayoff ? partidosPlayoffs.find((partido) => partido.fecha_partido_playoffs_id === fechaPartidoVer.id) : partidos.find((partido) => partido.fecha_partido_id === fechaPartidoVer.id);
      const equipoEncontrado1 = equipos.find((equipo) => equipo.id === fechaPartidoVer.equipo_1);
      const equipoEncontrado2 = equipos.find((equipo) => equipo.id === fechaPartidoVer.equipo_2);
      const arbitroEncontrado1 = arbitros.find((arbitro) => arbitro.id === fechaPartidoVer.arbitro_1);
      const arbitroEncontrado2 = arbitros.find((arbitro) => arbitro.id === fechaPartidoVer.arbitro_2);

      if (partidoEncontrado) {
        setPartidoActual(partidoEncontrado);
      }

      if (equipoEncontrado1 && equipoEncontrado2) {
        setEquipo1(equipoEncontrado1);
        setEquipo2(equipoEncontrado2);
      }

      if (partidoEncontrado.puntaje_equipo_1 > partidoEncontrado.puntaje_equipo_2) {
        setEquipoGanador(equipoEncontrado1);
        setEquipoPerdedor(equipoEncontrado2);
      } else {
        setEquipoGanador(equipoEncontrado2);
        setEquipoPerdedor(equipoEncontrado1);
      }

      if (arbitroEncontrado1 && arbitroEncontrado2) {
        const userEncontrado1 = users.find((user) => user.id === arbitroEncontrado1.id_user);
        const userEncontrado2 = users.find((user) => user.id === arbitroEncontrado2.id_user);
        setUserArbitro1(userEncontrado1);
        setUserArbitro2(userEncontrado2);
      }
    }
  }, [fechaPartidoVer, partidos, equipos, arbitros]); 

  const formatFecha = (fecha) => {
    const date = new Date(fecha);

    // Obtener la diferencia horaria en minutos
    const timezoneOffset = date.getTimezoneOffset();

    // Ajustar la fecha sumando la diferencia horaria
    date.setMinutes(date.getMinutes() + timezoneOffset);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
};
  return (
       <>
  <div className="fixed top-0 left-0 right-0 bottom-0 z-[75] bg-black opacity-50"></div>
  <div className={`fixed inset-0 flex items-center justify-center z-[80] top-[5%] mb-5`}>
    <div className="bg-gray-100 w-full max-w-3xl max-h-full rounded-l-lg overflow-y-auto">
      <div className='flex w-full space-x-4 py-5 px-5 bg-orange-500'>
        <div className='w-[50%] flex justify-left items-center text-white text-2xl font-bold'>
          Estadisticas
        </div>
        <div className='w-[50%] flex justify-end items-center'>
          {patrocinadorConPrioridad &&(
            patrocinadorConPrioridad.length > 0 &&(
              <div className='w-20 h-20 rounded-full bg-white flex justify-center items-center border '>
                <img src={`/images/${patrocinadorConPrioridad[0].logo}?${new Date().getTime()}`} alt={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} title={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} className="rounded-full" />
              </div>
            )
          )}
        </div>
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
            <td className="text-base font-bold pt-3">Fecha y hora:</td>
            <td className="text-base">{formatFecha(fechaPartidoVer.fecha)} _ {fechaPartidoVer.horario}Hs.</td>
            </tr>
            <tr>
            <td className="text-base font-bold">Árbitros:</td>
            <td className="text-base">{userArbitro1.nombre} {userArbitro1.apellido} / {userArbitro2.nombre} {userArbitro2.apellido}.</td>
            </tr>
            <tr>
            <td className="text-base font-bold">Ganador:</td>
            <td className="text-base">{equipoGanador.nombre}.</td>
            </tr>
        </tbody>
        </table>

        <table className="w-full border border-separate border-black rounded-lg p-5 mt-3 bg-white">
          <thead>
            <tr>
              <th className="text-left text-lg font-bold border-b" colSpan="3">Resultado del Partido</th>
            </tr>
            <tr>
              <th className="text-base font-bold border-r pt-3">{equipo1.nombre}</th>
              <th className="text-base font-bold border-r pt-3">Marcador</th>
              <th className="text-base font-bold pt-3">{equipo2.nombre}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" text-lg font-semibold border-r">
                <div className='flex justify-center'>
                    <img src={`/images/${equipo1.logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" alt={equipo1.nombre} title={equipo1.nombre}/>
                </div>
              </td>
              <td className=" text-base font-semibold border-r">
                  <div className='flex justify-center'>
                    {partidoActual.puntaje_equipo_1} - {partidoActual.puntaje_equipo_2}
                  </div>  
              </td>
              <td className=" text-lg font-semibold">
                  <div className='flex justify-center'>
                    <img src={`/images/${equipo2.logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" alt={equipo2.nombre} title={equipo2.nombre}/>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border border-separate border-black rounded-lg p-5 mt-3 bg-white">
          <thead>
            <tr>
              <th className="text-left text-lg font-bold border-b" colSpan="2">Puntos Individuales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-1/2">
                {jugadorPartido
                  .filter((jugador) => esPlayoff ? (jugador.partido_playoff_id === partidoActual.id) : (jugador.partido_id === partidoActual.id))
                  .map((jugador) => (
                    jugadores.map((jugadorObj) =>
                      jugadorObj.id === jugador.jugador_id && jugadorObj.equipo_id === equipo1.id ? (
                        <div className="grid grid-cols-2 justify-start items-center my-3" key={`jugador_${jugadorObj.id}_equipo_1`}>
                          <div>
                            <img src={`/images/${jugadorObj.foto_perfil}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" title={`jugador: ${jugadorObj.nombre + ' ' + jugadorObj.apellido}`} alt={`jugador: ${jugadorObj.nombre + ' ' + jugadorObj.apellido}`} />
                          </div>
                          <div className="flex flex-col justify-start">
                            <span className="text-base font-semibold">{jugadorObj.nombre + ' ' + jugadorObj.apellido}</span>
                            <span className="text-base font-semibold">Puntos: {jugador.puntos_anotados}</span>
                          </div>
                        </div>
                      ) : ''
                    )
                  ))}
              </td>
              <td className="w-1/2">
                {jugadorPartido
                  .filter((jugador) => esPlayoff ? (jugador.partido_playoff_id === partidoActual.id) : (jugador.partido_id === partidoActual.id))
                  .map((jugador) => (
                    jugadores.map((jugadorObj) =>
                      jugadorObj.id === jugador.jugador_id && jugadorObj.equipo_id === equipo2.id ? (
                        <div className="grid grid-cols-2 justify-start items-center my-3" key={`jugador_${jugadorObj.id}_equipo_2`}>
                          <div className="flex flex-col justify-start">
                            <span className="text-base font-semibold">{jugadorObj.nombre + ' ' + jugadorObj.apellido}</span>
                            <span className="text-base font-semibold">Puntos: {jugador.puntos_anotados}</span>
                          </div>
                          <div>
                            <img src={`/images/${jugadorObj.foto_perfil}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" title={`jugador: ${jugadorObj.nombre + ' ' + jugadorObj.apellido}`} alt={`jugador: ${jugadorObj.nombre + ' ' + jugadorObj.apellido}`} />
                          </div>
                        </div>
                      ) : ''
                    )
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-4">
          <BotonContenido
            nombre={'Cerrar'}
            className={' ml-2'}
            onClick={closeModalVerEstadisticas}
            />
          
        </div>
      </div>
    </div>
  </div>
</>

    )
}
export default ModalVerEstadisticas;