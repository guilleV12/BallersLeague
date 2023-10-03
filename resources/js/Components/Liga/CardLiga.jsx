import React from 'react'

export const CardLiga = ({ path, liga, className }) => {
  return (
        <div className={`w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
                <div className="flex flex-col items-center justify-center pb-10">
                        <img className="h-52 w-auto my-5 rounded-full shadow-xl" src={'/images/'+path}  alt={`Liga `+liga.nombre}/>
                        <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{liga.nombre}</h5>
                        <span className="text-md text-gray-500 dark:text-gray-400">Descripcion: {liga.descripcion}</span>
                        <div className="flex mt-4 space-x-3 md:mt-6">
                            <a href={route('ligas.show',[liga.user_id])} className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-500">
                                Ver liga
                            </a>
                        </div>
                </div>
        </div>
        
  )
}
