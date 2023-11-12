import React from 'react'
import ApplicationLogo from '../ApplicationLogo'
import { BotonJugadores} from '../BotonesAcciones';

export const TabCampeon = ({ liga, userAdmin, campeon, equipos }) => {

    const encontrarEquipoCampeon = (equipos, idCampeon) => {
        const equipoCampeon = equipos.find((equipo) => equipo.id === idCampeon);
        return equipoCampeon || {}; // Devuelve un objeto vacío si no se encuentra el equipo
    };

    const equipoCampeon = encontrarEquipoCampeon(equipos, campeon.equipo_id);
  
  return (
    <div className='p-8'>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex justify-between">
            <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-24 md:h-44 w-auto rounded-full" />
            <ApplicationLogo 
              texto={true} 
              className='h-24 md:h-44 w-auto rounded-full'
              />
        </h2>
        <div className="w-full flex justify-center overflow-x-auto shadow-lg shadow-gray-500 rounded-lg border border-gray-400">
                        <table className="w-full flex-col text-left text-black dark:text-gray-400">
                                <caption className='bg-orange-500 text-white text-xl font-semibold py-5'>Campeon</caption>
                                <tbody>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='w-full flex justify-center items-center mt-5'>
                                                    <div className='w-52 h-52 rounded-full bg-white flex justify-center items-center'>
                                                    <img src={`/images/${equipoCampeon.logo}?${new Date().getTime()}`} alt={`logo liga: ${equipoCampeon.nombre}`} className='h-auto w-44 rounded-full' />
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4 flex text-xl justify-center items-center font-semibold md:w-[50%]">
                                                {equipoCampeon.nombre}
                                            </td>  
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="flex w-full text-base justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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