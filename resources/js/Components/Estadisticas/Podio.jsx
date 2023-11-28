import React, { useEffect, useState } from 'react'
import { BotonContenido, BotonJugadores } from '../BotonesAcciones';
import SecondaryButton from '../SecondaryButton';

const Podio = ({
    tablaPosiciones, 
    equipos,
    hayPlayoffs,
    campeon,
    partidosPlayoffs
}) => {

    const subCampeon = () => {
    
        if (hayPlayoffs && partidosPlayoffs.length > 0) {
            const ultimoPartidoPlayoffs = partidosPlayoffs[partidosPlayoffs.length - 1];
            const idEquipoPerdedor = ultimoPartidoPlayoffs.puntaje_equipo_1 > ultimoPartidoPlayoffs.puntaje_equipo_2
                ? hayPlayoffs[hayPlayoffs.length - 1].equipo_2
                : hayPlayoffs[hayPlayoffs.length - 1].equipo_1;
        
                const subcampeon = equipos.find(equipo => equipo.id === idEquipoPerdedor);
                return subcampeon;
        }
    
        return null; // Manejar el caso cuando no hay playoffs, partidosPlayoffs está vacío, o no se encuentra el subcampeón
    };    

    const subcampeon = subCampeon();

  return (
    hayPlayoffs
        ? (
            <div className='w-full bg-white flex justify-around items-end rounded-lg p-8'>
                
                <div className={`grid grid-cols-1 border border-gray-50 rounded-lg shadow-yellow-400 w-[40%] pt-5 h-[20rem] shadow-xl`}>
                    <div className='w-full flex justify-center h-[2rem]'>
                            <button
                                className={'bg-black rounded-l-lg text-white font-semibold text-xs p-2'}
                                >
                                CAMPEON
                                </button>
                            <a href={route('jugadores.index',campeon.equipo_id)} className={'bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                                <button className={'flex w-full h-full justify-center items-center p-2 bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                                    JUGADORES
                                </button>
                            </a>
                        </div>
                    
                    <div className='w-full bg-white flex justify-center items-center rounded-full'>
                        <div className='w-52 h-52 rounded-full'>
                        {
                            equipos
                                .filter((equipo) => equipo.id === campeon.equipo_id)
                                .map((equipoFiltrado) => 
                                        <img 
                                        key={equipoFiltrado.id} 
                                        src={`/images/${equipoFiltrado.logo}?${new Date().getTime()}`} 
                                        alt={`logo liga: ${equipoFiltrado.nombre}`} 
                                        className=" object-cover" />
                                )
                        }
                        </div>
                    </div>
                </div>
                <div className={`grid grid-cols-1 border border-gray-50 rounded-lg shadow-gray-500 w-[40%] pt-5 h-[18rem] shadow-xl`}>
                        <div className='w-full flex justify-center h-[2rem]'>
                            <button
                                className={'bg-black rounded-l-lg text-white font-semibold text-xs p-2'}
                                >
                                SUBCAMPEON
                                </button>
                            <a href={route('jugadores.index',subcampeon.id)} className={'bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                                <button className={'flex w-full h-full justify-center items-center p-2 bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                                    JUGADORES
                                </button>
                            </a>
                        </div>

                    <div className='w-full bg-white flex justify-center items-center rounded-full'>
                        <div className='w-52 h-52 rounded-full'>
                        {
                            <img src={`/images/${subcampeon.logo}?${new Date().getTime()}`} alt={`logo liga: ${subcampeon.nombre}`} className="p-5 object-cover" />
                        }
                        </div>
                    </div>
                </div>

            </div>
        )
        : (
            <div className='w-full bg-white flex justify-around items-end rounded-lg p-8'>
            {
            tablaPosiciones
            .slice(0, 3)
            .map((equipoPosicion, index) => (
                <div key={equipoPosicion.id} className={`grid grid-cols-1 border border-gray-50 rounded-lg shadow-orange-500 w-[30%] pt-5 ${index === 0?('h-[20rem] shadow-xl'):(index === 1 ? ('h-[18rem] shadow-lg'): ('h-[15rem] shadow-md'))}`}>
                    <div className='w-full flex justify-center mb-2'>
                        <button
                            className={'bg-black rounded-l-lg text-white font-semibold text-xs p-2'}
                            >
                            {index === 0?('CAMPEON'):(index === 1 ? ('SUBCAMPEON'): ('TERCERO'))}
                            </button>
                        <a href={route('jugadores.index',equipoPosicion.equipo_id)} className={'bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                            <button className={'flex w-full h-full justify-center items-center p-2 bg-orange-500 rounded-r-lg text-white font-semibold text-xs hover:bg-gray-700'}>
                                JUGADORES
                            </button>
                        </a>
                    </div>
                    <div className='w-full flex justify-center mb-2'>

                        <div className='w-52 h-52 rounded-full  flex justify-center'>
                        {
                            equipos
                            .filter((equipo) => equipo.id === equipoPosicion.equipo_id)
                            .map((equipoFiltrado) => 
                                    <img 
                                    key={equipoFiltrado.id} 
                                    src={`/images/${equipoFiltrado.logo}?${new Date().getTime()}`} 
                                    alt={`logo liga: ${equipoFiltrado.nombre}`} 
                                    className="w-44 h-44" />
                            )
                        }
                        </div>
                    </div>
                </div>
            ))
            }
            </div>
    )
  )
}

export default Podio