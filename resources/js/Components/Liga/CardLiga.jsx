import React from 'react'

export const CardLiga = ({ path, liga, className, patrocinadores }) => {

  return (
        <div className={`bg-white dark:bg-gray-800 ${className} w-[90%] md:mb-5`}>
                <div className="flex flex-col items-center justify-center">
                {patrocinadores && (
                  patrocinadores.length > 0 && (
                    <div className='w-full flex justify-end'>
                      {patrocinadores
                        .filter(patrocinador => patrocinador.liga_patrocinada === liga.id)
                        .filter(patrocinador => patrocinador.prioridad === 1)
                        .map((patrocinadorPrioritario) => (
                          <div key={patrocinadorPrioritario.id} className='w-20 h-20 rounded-full bg-white flex justify-center items-center border shadow-lg shadow-gray-300'>
                            <img className="h-10 w-auto my-5 rounded-full" src={'/images/'+patrocinadorPrioritario.logo} title={`patrocinador: ${patrocinadorPrioritario.nombre}`}  alt={`Liga `+patrocinadorPrioritario.nombre}/>
                          </div>
                        ))
                      }
                    </div>
                  )
                )}

                        <div className='w-52 h-52 rounded-full bg-white flex justify-center items-center border shadow-lg shadow-gray-300'>
                          <img className="h-48 w-auto my-5 rounded-full" src={'/images/'+path}  alt={`Liga `+liga.nombre}/>
                        </div>
                        <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{liga.nombre}</h5>
                        <span className="hidden md:block text-md text-gray-500 dark:text-gray-400">Descripcion: {liga.descripcion}</span>
                        <div className="flex mt-4 space-x-3 md:mt-6">
                            <a href={route('ligas.show',[liga.user_id])} className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-500">
                                Ver liga
                            </a>
                        </div>
                </div>
        </div>
        
  )
}
