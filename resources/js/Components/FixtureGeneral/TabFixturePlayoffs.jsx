import React, { useState } from 'react';
import TabFixture from '../Fixture/TabFixture';
import TabPlayoffs from '../Playoffs/TabPlayoffs';
import TabCampeon from '../Campeon/TabCampeon';

export const TabFixturePlayoffs = ({
  liga,
  jugadorPartido,
  partidos,
  user,
  calendario,
  fechas,
  equipos,
  fechasPlayoffs,
  arbitros,
  users,
  patrocinadorConPrioridad,
  setShowAlert,
  userAdmin,
  setTituloAlert,
  rol,
  jugadores,
  partidosPlayoffs,
  playoffs,
  campeon
}) => {
  const [activeTab, setActiveTab] = useState('regular'); // Tab inicialmente activo

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full text-md shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap font-medium text-center text-gray-500  bg-black dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li className="mr-2">
                <button id="regular-tab" onClick={() => handleTabClick('regular')} data-tabs-target="#regular" type="button" role="tab" aria-controls="regular" aria-selected={activeTab === 'regular'} className={`inline-block p-4 rounded-lg hover:bg-gray-600 ${activeTab === 'regular' ? 'bg-gray-800 text-orange-500 dark:bg-gray-800' : 'text-white'}`}>
                  <p className='font-semibold'>Fase regular</p>
                </button>
            </li>
            <li className="mr-2">
                <button id="playoffs-tab" onClick={() => handleTabClick('playoffs')} data-tabs-target="#playoffs" type="button" role="tab" aria-controls="playoffs" aria-selected={activeTab === 'playoffs'} className={`inline-block p-4 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'playoffs' ? 'bg-gray-800 dark:bg-gray-800 text-orange-500' : 'text-white'}`}>
                  <p className='font-semibold'>Playoffs</p>
                </button>
            </li>
          {campeon ? (
            <li className="mr-2">
                <button id="campeon-tab" onClick={() => handleTabClick('campeon')} data-tabs-target="#campeon" type="button" role="tab" aria-controls="campeon" aria-selected={activeTab === 'campeon'} className={`inline-block p-4 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'campeon' ? 'bg-gray-800 dark:bg-gray-800 text-orange-500' : 'text-white'}`}>
                  <p className='font-semibold'>Campeon</p>
                </button>
            </li>
          ):('')}
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
            <div className={`${activeTab === 'regular' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="regular" role="tabpanel" aria-labelledby="regular-tab">
                {/* Contenido del tab 'posiciones' */}
                  <TabFixture
                    jugadorPartido={jugadorPartido} 
                    partidos={partidos} 
                    jugadores={jugadores} 
                    user={user} 
                    calendario={calendario} 
                    fechas={fechas} 
                    equipos={equipos} 
                    fechasPlayoffs={fechasPlayoffs}
                    arbitros={arbitros} 
                    liga={liga} 
                    users={users} 
                    setShowAlert={setShowAlert} 
                    patrocinadorConPrioridad={patrocinadorConPrioridad}
                    setTituloAlert={setTituloAlert} 
                    rol={rol}
                    />
                {/* Resto del contenido del tab 'goleadores' */}
            </div>
            <div className={`${ activeTab === 'playoffs' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="playoffs" role="tabpanel" aria-labelledby="playoffs-tab">
                {/* Contenido del tab 'goleadores' */}
                <TabPlayoffs
                  playoffs={playoffs}
                  liga={liga}
                  fechas={fechas}
                  partidos={partidos}
                  jugadorPartido={jugadorPartido}
                  equipos={equipos}
                  patrocinadorConPrioridad={patrocinadorConPrioridad}
                  setShowAlert={setShowAlert} 
                  setTituloAlert={setTituloAlert} 
                  fechasPlayoffs={fechasPlayoffs}
                  user={user}
                  partidosPlayoffs={partidosPlayoffs}
                  arbitros={arbitros}
                  rol={rol}
                  jugadores={jugadores}
                  users={users}
                />
                {/* Resto del contenido del tab 'goleadores' */}
            </div>
            {campeon ? (
              <div className={`${activeTab === 'campeon' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="campeon" role="tabpanel" aria-labelledby="campeon-tab">
                <TabCampeon
                  equipos={equipos}
                  campeon={campeon}
                  userAdmin={userAdmin}
                  liga={liga}
                />
              </div>
            ):('')}
        </div>
    </div>
  );
};
export default TabFixturePlayoffs;