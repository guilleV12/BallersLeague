import React from 'react'
import ApplicationLogo from '../ApplicationLogo'
import CardInfoLiga from './CardInfoLiga'

export const TabInfoLiga = ({ liga, userAdmin }) => {
  
  return (
    <div>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex justify-between">
            <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-24 md:h-44 w-auto rounded-full" />
            <ApplicationLogo 
              texto={true} 
              className='h-24 md:h-44 w-auto rounded-full'
              />
        </h2>

        <CardInfoLiga 
          liga={liga} 
          userAdmin={userAdmin} 
          />
  </div>
  )
}
