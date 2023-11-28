import React from 'react'
import ApplicationLogo from '../ApplicationLogo'
import CardInfoLiga from './CardInfoLiga'

export const TabInfoLiga = ({ liga, userAdmin, patrocinadorConPrioridad }) => {
  
  return (
    <div>
        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex justify-between">
          <div className='h-24 w-52 md:h-52 rounded-full bg-white flex justify-center items-center border shadow-lg shadow-gray-300'>
            <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`Liga: ${liga.nombre}`} title={`Liga: ${liga.nombre}`} className="rounded-full" />
          </div>
            {patrocinadorConPrioridad &&(
              patrocinadorConPrioridad.length > 0 &&(
                <div className='w-52 h-24 md:h-52 rounded-full bg-white flex justify-center items-center border shadow-lg shadow-gray-300'>
                  <img src={`/images/${patrocinadorConPrioridad[0].logo}?${new Date().getTime()}`} alt={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} title={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} className="rounded-full" />
                </div>
              )
            )}
            <div className='w-52 h-24 md:h-52 rounded-full bg-white flex justify-center items-center border shadow-lg shadow-gray-300'>
              <ApplicationLogo 
                texto={true} 
                className='rounded-full '
                />
            </div>
        </h2>

        <CardInfoLiga 
          liga={liga} 
          userAdmin={userAdmin} 
          />
  </div>
  )
}
