import React, { useState } from 'react';
import TablaPaginadaPosiciones from './TablaPaginadaPosiciones';
import TablaPaginadaGoleadores from './TablaPaginadaGoleadores';
import Podio from './Podio';
import JugadorMasValioso from './JugadorMasValioso';

export const TabEstadisticasLiga = ({ 
  liga,
  user,
  patrocinadorConPrioridad,
  tablaPosiciones,
  equipos,
  goleadores,
  jugadores,
  campeon,
  playoffs,
  partidosPlayoffs,
  setShowAlert,
  setTituloAlert,
  votosJMV,
  rol
}) => {
  const [activeTab, setActiveTab] = useState('posiciones'); // Tab inicialmente activo

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full text-md shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap font-medium text-center text-gray-500  bg-black dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li className="">
                <button id="posiciones-tab" onClick={() => handleTabClick('posiciones')} data-tabs-target="#posiciones" type="button" role="tab" aria-controls="posiciones" aria-selected={activeTab === 'posiciones'} className={`inline-block p-4 rounded-lg hover:bg-gray-600 ${activeTab === 'posiciones' ? 'bg-gray-800 text-lg text-white dark:bg-gray-800' : 'text-white'}`}>
                  <p className='font-semibold'>Tabla de posiciones</p>
                </button>
            </li>
            <li className="">
                <button id="goleadores-tab" onClick={() => handleTabClick('goleadores')} data-tabs-target="#goleadores" type="button" role="tab" aria-controls="goleadores" aria-selected={activeTab === 'goleadores'} className={`rounded-lg inline-block p-4 hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'goleadores' ? 'bg-gray-700 text-lg text-white dark:bg-gray-800' : 'text-white'}`}>
                  <p className='font-semibold'>Goleadores</p>
                </button>
            </li>
            {campeon &&(
              <>
              <li className="">
                <button id="podio-tab" onClick={() => handleTabClick('podio')} data-tabs-target="#podio" type="button" role="tab" aria-controls="podio" aria-selected={activeTab === 'podio'} className={`rounded-lg inline-block p-4 hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'podio' ? 'bg-gray-700 text-lg text-white dark:bg-gray-800' : 'text-white'}`}>
                  <p className='font-semibold'>Podio</p>
                </button>
              </li>
              <li className="">
              <button id="mvp-tab" onClick={() => handleTabClick('mvp')} data-tabs-target="#mvp" type="button" role="tab" aria-controls="mvp" aria-selected={activeTab === 'mvp'} className={`rounded-lg inline-block p-4 hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'mvp' ? 'bg-gray-700 text-lg text-white dark:bg-gray-800' : 'text-white'}`}>
                <p className='font-semibold'>Jugador mas valioso</p>
              </button>
            </li>
            </>
            )}
            <li className='p-2 ml-auto'>
              {patrocinadorConPrioridad &&(
                patrocinadorConPrioridad.length > 0 &&(
                  <div className='w-20 h-20 rounded-full bg-white flex justify-center items-center border '>
                    <img src={`/images/${patrocinadorConPrioridad[0].logo}?${new Date().getTime()}`} alt={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} title={`Patrocinador: ${patrocinadorConPrioridad[0].nombre}`} className="rounded-full" />
                  </div>
                )
              )}
            </li>
        </ul>
        <div id="defaultTabContent">
            <div className={`${activeTab === 'posiciones' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="posiciones" role="tabpanel" aria-labelledby="posiciones-tab">
                {/* Contenido del tab 'posiciones' */}
                <TablaPaginadaPosiciones
                  liga={liga}
                  user={user}
                  tablaPosiciones={tablaPosiciones}
                  equipos={equipos}
                  />
            </div>
            <div className={`${ activeTab === 'goleadores' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="goleadores" role="tabpanel" aria-labelledby="goleadores-tab">
                {/* Contenido del tab 'goleadores' */}
                <TablaPaginadaGoleadores
                  liga={liga}
                  user={user}
                  goleadores={goleadores}
                  jugadores={jugadores}
                  equipos={equipos}
                  />
            </div>
            {campeon &&(
              <>
              <div className={`${ activeTab === 'podio' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="podio" role="tabpanel" aria-labelledby="podio-tab">
                <Podio
                  tablaPosiciones={tablaPosiciones}
                  equipos={equipos}
                  hayPlayoffs={playoffs?(playoffs.length>0?(playoffs):null):null}
                  campeon={campeon}
                  liga={liga}
                  partidosPlayoffs={partidosPlayoffs}
                  />
              </div>
              <div className={`${ activeTab === 'mvp' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="mvp" role="tabpanel" aria-labelledby="mvp-tab">
                <JugadorMasValioso
                  setShowAlert={setShowAlert}
                  setTituloAlert={setTituloAlert}
                  user={user}
                  equipos={equipos}
                  liga={liga}
                  jugadores={jugadores}
                  goleadores={goleadores}
                  votosJMV={votosJMV}
                  rol={rol}
                  />
              </div>
              </>
            )}
        </div>
    </div>
  );
};
