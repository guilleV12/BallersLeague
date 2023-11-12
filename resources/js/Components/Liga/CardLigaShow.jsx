import React, { useState } from 'react';
import { TabEstadisticasLiga } from '../Estadisticas/TabEstadisticasLiga';
import TabEquipos from '../Equipo/TabEquipos';
import ModalEditarLiga from './ModalEditarLiga';
import ModalEliminarLiga from './ModalEliminarLiga';
import { TabInfoLiga } from './TabInfoLiga';
import Dropdown from '../Dropdown';
import TabArbitros from '../Arbitros/TabArbitros';
import Alert from '../Alerts/Alert';
import TabFixture from '../Fixture/TabFixture';
import { BotonContenido, BotonEditar, BotonEliminar, BotonOpciones, BotonTab } from '../BotonesAcciones';
import ModalCrearNotificaciones from '../Notificaciones/ModalCrearNotificaciones';
import TabPlayoffs from '../Playoffs/TabPlayoffs';
import TabCampeon from '../Campeon/TabCampeon';

// Componente principal
const CardLigaShow = ({
  jugadorPartido,
  partidos,
  jugadores,
  liga,
  user,
  equipos,
  userAdmin,
  arbitros,
  users,
  calendario,
  fechas,
  rol,
  notificacionesUsuario,
  playoffs,
  fechasPlayoffs,
  partidosPlayoffs,
  campeon
}) => {
  const [activeTab, setActiveTab] = useState('liga');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [tituloAlert, setTituloAlert] = useState('');
  const [isModalNotificacionesOpen, setModalNotificacionesOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  
  return (
    <div className={`w-[90%] xl:w-full bg-white border border-black rounded-lg shadow-lg shadow-gray-500 dark:bg-gray-800 dark:border-gray-700 ${isDeleteModalOpen ? `pointer-events-none` : ''}`}>
      <ul className="flex flex-wrap justify-between text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
        <div className='block w-full md:w-auto md:flex'>
          <div className='flex md:hidden justify-end'>
            <li className={`mr-2 ${(liga.user_id === user.id ? '' : 'hidden')} flex p-2`}>
                <Dropdown>
                    <Dropdown.Trigger>
                        <BotonOpciones />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <ul className='p-2'>
                          <li>
                              <BotonEditar
                                onClick={openEditModal}
                                className={'mt-1 block w-full justify-center'}
                                />                  
                          </li>
                          <li>
                              <BotonEliminar
                                onClick={openDeleteModal}
                                className={'mt-1 block w-full justify-center'}
                                />
                          </li>
                        </ul>
                    </Dropdown.Content>
                </Dropdown>
            </li>
          </div>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="liga-tab"
              label="Liga"
              onClick={() => handleTabClick('liga')}
              isActive={activeTab === 'liga'}
              className={' w-full md:w-auto'}
              />          
          </li>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="estadisticas-tab"
              label="Estadisticas"
              onClick={() => handleTabClick('estadisticas')}
              isActive={activeTab === 'estadisticas'}
              className={' w-full md:w-auto'}
              />   
          </li>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="equipos-tab"
              label="Equipos"
              onClick={() => handleTabClick('equipos')}
              isActive={activeTab === 'equipos'}
              className={' w-full md:w-auto'}
              />
          </li>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="arbitros-tab"
              label="Arbitros"
              onClick={() => handleTabClick('arbitros')}
              isActive={activeTab === 'arbitros'}
              className={' w-full md:w-auto'}
              />
          </li>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="fixture-tab"
              label="Fixture"
              onClick={() => handleTabClick('fixture')}
              isActive={activeTab === 'fixture'}
              className={' w-full md:w-auto'}
              />
          </li>
          <li className="w-full md:w-auto md:ml-1">
            <BotonTab
              id="playoffs-tab"
              label="Playoffs"
              onClick={() => handleTabClick('playoffs')}
              isActive={activeTab === 'playoffs'}
              className={' w-full md:w-auto'}
              />
          </li>
          {campeon ? (
            <li className='w-auto ml-1'>
              <BotonTab
                id="campeon-tab"
                label="Campeon"
                onClick={() => handleTabClick('campeon')}
                isActive={activeTab === 'campeon'}
                className={' w-full md:w-auto'}
                />
            </li>
          ):(
            ''
          )}
          
        </div>
        <div className='hidden md:flex'>
          <li className='flex justify-center items-center'>
            <button type="button" onClick={() => {setModalNotificacionesOpen(true);}} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <span className="flex justify-center items-center text-3xl ">
                    <ion-icon name="notifications-circle-outline"/>
                </span>
            </button>
          </li>
          <li className={`mr-2 ${(liga.user_id === user.id ? '' : 'hidden')} flex p-2`}>
              <Dropdown>
                  <Dropdown.Trigger>
                      <BotonOpciones />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                      <ul className='p-2'>
                        <li>
                            <BotonEditar
                              onClick={openEditModal}
                              className={'mt-1 block w-full justify-center'}
                              />                  
                        </li>
                        <li>
                            <BotonEliminar
                              onClick={openDeleteModal}
                              className={'mt-1 block w-full justify-center'}
                              />
                        </li>
                      </ul>
                  </Dropdown.Content>
              </Dropdown>
          </li>
        </div>
      </ul>
      <div id="defaultTabContent">
        <div className={`${activeTab === 'liga' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark.bg-gray-800`} id="liga" role="tabpanel" aria-labelledby="liga-tab">
            <TabInfoLiga 
              liga={liga} 
              user={user} 
              userAdmin={userAdmin} 
              />
        </div>
        <div className={`${activeTab === 'estadisticas' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="estadisticas" role="tabpanel" aria-labelledby="estadisticas-tab">
            <TabEstadisticasLiga 
              liga={liga} 
              user={user} 
              />
        </div>
        <div className={`${activeTab === 'equipos' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="equipos" role="tabpanel" aria-labelledby="equipos-tab">
            <TabEquipos 
              fechas={fechas} 
              user={user} 
              liga={liga} 
              equipos={equipos} 
              setShowAlert={setShowAlert} 
              setTituloAlert={setTituloAlert} 
              calendario={calendario}
              partidos={partidos}
              />
        </div>
        <div className={`${activeTab === 'arbitros' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="arbitros" role="tabpanel" aria-labelledby="arbitros-tab">    
            <TabArbitros 
              partidos={partidos} 
              fechas={fechas} 
              arbitros={arbitros} 
              liga={liga} 
              users={users} 
              userAdmin={userAdmin} 
              userAuth={user} 
              setShowAlert={setShowAlert} 
              setTituloAlert={setTituloAlert} 
              />
        </div>
        <div className={`${activeTab === 'fixture' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="fixture" role="tabpanel" aria-labelledby="fixture-tab">
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
              setTituloAlert={setTituloAlert} 
              rol={rol}
              />
        </div>
        <div className={`${activeTab === 'playoffs' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="playoffs" role="tabpanel" aria-labelledby="playoffs-tab">
            <TabPlayoffs
              playoffs={playoffs}
              liga={liga}
              fechas={fechas}
              partidos={partidos}
              jugadorPartido={jugadorPartido}
              equipos={equipos}
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

      {isDeleteModalOpen && (
        <ModalEliminarLiga 
          onDelete={closeDeleteModal} 
          onCancel={closeDeleteModal} 
          liga={liga} 
          />
      )}
      {isEditModalOpen && (
        <ModalEditarLiga 
          setTituloAlert={setTituloAlert} 
          user={user} 
          liga={liga} 
          onCancel={closeEditModal} 
          onEdit={closeEditModal} 
          setShowAlert={setShowAlert} 
          />
      )}
      {showAlert && (
        <Alert titulo={tituloAlert} 
          texto={''} 
          tiempo={3000} 
          showAlert={showAlert} 
          icono={'success'} 
          closeAlert={closeAlert} 
          />
      )}
      {isModalNotificacionesOpen&&(
        <ModalCrearNotificaciones
          onAdd={() => {setModalNotificacionesOpen(false);}}
          onCancel={() => {setModalNotificacionesOpen(false);}}
          user={user}
          liga={liga}
          actionRoute={'notificaciones.store'}
          accion={'agregar'}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
          notificacionesUsuario={notificacionesUsuario}
          />
      )}
    </div>
  );
};

export default CardLigaShow;
