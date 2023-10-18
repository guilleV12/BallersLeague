import React, { useState } from 'react';

export const CardEstadisticasLiga = ({liga,user}) => {
  const [activeTab, setActiveTab] = useState('posiciones'); // Tab inicialmente activo

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full text-md shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200 bg-black dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li className="mr-2">
                <button id="posiciones-tab" onClick={() => handleTabClick('posiciones')} data-tabs-target="#posiciones" type="button" role="tab" aria-controls="posiciones" aria-selected={activeTab === 'posiciones'} className={`inline-block p-4  hover:bg-gray-600 ${activeTab === 'posiciones' ? 'bg-gray-800 text-orange-500 dark:bg-gray-800' : 'text-white'}`}>
                  <p className='font-semibold'>Tabla de posiciones</p>
                </button>
            </li>
            <li className="mr-2">
                <button id="goleadores-tab" onClick={() => handleTabClick('goleadores')} data-tabs-target="#goleadores" type="button" role="tab" aria-controls="goleadores" aria-selected={activeTab === 'goleadores'} className={`inline-block p-4 hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'goleadores' ? 'bg-gray-800 dark:bg-gray-800 text-orange-500' : 'text-white'}`}>
                  <p className='font-semibold'>Puntos por partido</p>
                </button>
            </li>
        </ul>
        <div id="defaultTabContent">
            <div className={`${activeTab === 'posiciones' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="liga" role="tabpanel" aria-labelledby="posiciones-tab">
                {/* Contenido del tab 'posiciones' */}
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                
                </h2>
                {/* Resto del contenido del tab 'goleadores' */}
            </div>
            <div className={`${ activeTab === 'goleadores' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="goleadores" role="tabpanel" aria-labelledby="goleadores-tab">
                {/* Contenido del tab 'goleadores' */}
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  
                </h2>
                {/* Resto del contenido del tab 'goleadores' */}
            </div>
        </div>
    </div>
  );
};
