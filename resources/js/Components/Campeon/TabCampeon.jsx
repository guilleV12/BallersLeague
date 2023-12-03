import React from 'react'
import ApplicationLogo from '../ApplicationLogo'
import { BotonJugadores} from '../BotonesAcciones';

export const TabCampeon = ({ liga, userAdmin, campeon, equipos, patrocinadorConPrioridad }) => {

    const encontrarEquipoCampeon = (equipos, idCampeon) => {
        const equipoCampeon = equipos.find((equipo) => equipo.id === idCampeon);
        return equipoCampeon || {}; // Devuelve un objeto vacío si no se encuentra el equipo
    };

    const equipoCampeon = encontrarEquipoCampeon(equipos, campeon.equipo_id);
  return (
    <div className='p-8 w-full flex-col justify-center'>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex justify-around">
            <div className='w-44 h-44 rounded-full bg-white flex justify-center items-center'>
                <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`Logo de Liga ${liga.nombre}`} title={`Logo de Liga ${liga.nombre}`} className="w-24 md:w-40 rounded-full" />
            </div>
            <div className='w-44 h-44 rounded-full bg-white flex justify-center items-center'>
                <ApplicationLogo 
                  texto={true} 
                  className='w-24 md:w-40 h-auto rounded-full'
                  />
            </div>
            {(patrocinadorConPrioridad && patrocinadorConPrioridad.length>0 )&&(
                <div className='w-44 h-44 rounded-full bg-white flex justify-center items-center'>
                    <img src={`/images/${patrocinadorConPrioridad[0].logo}?${new Date().getTime()}`} title={`Logo patrocinador ${patrocinadorConPrioridad[0].nombre}`} alt={`Logo patrocinador ${patrocinadorConPrioridad[0].nombre}`} className="w-24 md:w-40 h-auto rounded-full" />
                </div>)
            }
        </h2>
        <div className="w-full flex justify-center ">
                        <table className="w-[55%] shadow-lg shadow-gray-500 rounded-lg border border-gray-400">
                                <caption className='bg-orange-500 text-white text-2xl font-semibold py-5 rounded-t-lg'>Campeon</caption>
                                <tbody className='rounded-b-lg'>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='w-full flex justify-center items-center mt-5'>
                                                    <div className='w-44 h-44 rounded-full bg-white flex justify-center items-center border border-black shadow-lg shadow-orange-500'>
                                                    <img src={`/images/${equipoCampeon.logo}?${new Date().getTime()}`} title={`campeon: ${equipoCampeon.nombre}`} alt={`campeon: ${equipoCampeon.nombre}`} className='h-auto w-40 rounded-full' />
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4 hidden md:flex text-xl justify-center items-center font-semibold md:w-[50%]">
                                                {equipoCampeon.nombre}
                                            </td>  
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700 rounded-b-lg">
                                        <th scope="row" className="rounded-b-lg flex w-full text-base justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <a href={route('jugadores.index',equipoCampeon.id)}>
                                                <BotonJugadores />
                                            </a>
                                        </th>
                                    </tr>                                    
                                </tbody>
                        </table>
                    </div>
        
  </div>
  )
}
export default TabCampeon;