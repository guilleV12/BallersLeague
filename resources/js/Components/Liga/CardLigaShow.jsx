import React, { useState } from 'react';
import { TabEstadisticasLiga } from '../Estadisticas/TabEstadisticasLiga';
import TabEquipos from '../Equipo/TabEquipos';
import ModalEditarLiga from './ModalEditarLiga';
import ModalEliminarLiga from './ModalEliminarLiga';
import { TabInfoLiga } from './TabInfoLiga';
import Dropdown from '../Dropdown';
import TabArbitros from '../Arbitros/TabArbitros';
import Alert from '../Alerts/Alert';
import { BotonContenido, BotonEditar, BotonEliminar, BotonOpciones, BotonTab } from '../BotonesAcciones';
import ModalCrearNotificaciones from '../Notificaciones/ModalCrearNotificaciones';
import TabFixturePlayoffs from '../FixtureGeneral/TabFixturePlayoffs';
import ModalCrearPatrocinador from '../Patrocinador/ModalCrearPatrocinador';
import TabPatrocinadores from '../Patrocinador/TabPatrocinadores';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

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
  campeon,
  tablaPosiciones,
  patrocinadores,
  goleadores,
  votosJMV
}) => {
  const [activeTab, setActiveTab] = useState('liga');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [tituloAlert, setTituloAlert] = useState('');
  const [isModalNotificacionesOpen, setModalNotificacionesOpen] = useState(false);
  const [isModalPatrocinadorOpen, setModalPatrocinadorOpen] = useState(false);
  const [isModalInfoOpen, setModalInfoOpen] = useState(false);

  const patrocinadorConPrioridad = patrocinadores ? ( patrocinadores.length > 0 ? patrocinadores.filter(patrocinador => patrocinador.prioridad) : null) : null;

  const openModalPatrocinador = () => {
    setModalPatrocinadorOpen(true);
  };
  const closeModalPatrocinador = () => {
    setModalPatrocinadorOpen(false);
  };
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
  const openModalInfo = () => {
    setModalInfoOpen(true);
  };
  const closeModalInfo = () => {
    setModalInfoOpen(false);
  };
  
  return (
    <div  className={`w-[90%] xl:w-full bg-white border border-black rounded-lg shadow-lg shadow-gray-500 dark:bg-gray-800 dark:border-gray-700 ${isDeleteModalOpen ? `pointer-events-none` : ''}`}>
      <ul id="tablist" role='tablist' aria-controls='tablist' className="flex flex-wrap text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
            <li className={`mr-2 flex md:hidden w-full p-2 justify-end`} role='tab' aria-controls='liga-tab'>
                {(user && liga.user_id === user.id) ? (
                        <>
                        <button type="button" onClick={() => {setModalNotificacionesOpen(true);}} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                          <span className="flex justify-center items-center text-3xl ">
                              <ion-icon name="notifications-circle-outline"/>
                          </span>
                          </button>
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
                                <li>
                                    <BotonContenido
                                      className={'mt-1 block w-full justify-center'}
                                      nombre={'Patrocinador'}
                                      />
      
                                </li>
                              </ul>
                          </Dropdown.Content>
                          </Dropdown>
                          </>
                          ):(
                          <button alt='Informacion' title='Informacion' type="button" onClick={openModalInfo} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                          <span className="flex justify-center items-center text-3xl ">
                              <ion-icon name="information-circle-outline"></ion-icon>
                          </span>
                          </button>
                          )
                  }
                
            </li>
          <li className="ml-1 w-full sm:w-fit" role='tab' aria-controls='estadisticas-tab' aria-selected={activeTab === 'liga'}>
            <BotonTab
              id="liga-tab"
              label="Liga"
              onClick={() => handleTabClick('liga')}
              isActive={activeTab === 'liga'}
              className={'w-full sm:w-fit'}
              alt={'Informacion de liga'}
              title={'Informacion de liga'}
              />          
          </li>
          <li className="w-full sm:w-fit" role='tab' aria-controls='liga-tab' aria-selected={activeTab === 'estadisticas'}>
            <BotonTab
              id="estadisticas-tab"
              label="Estadisticas"
              onClick={() => handleTabClick('estadisticas')}
              isActive={activeTab === 'estadisticas'}
              className={'w-full sm:w-fit '}
              alt={'Estadisticas de liga'}
              title={'Estadisticas de liga'}
              />   
          </li>
          <li className="w-full sm:w-fit" role='tab' aria-controls='liga-tab' aria-selected={activeTab === 'equipos'}>
            <BotonTab
              id="equipos-tab"
              label="Equipos"
              onClick={() => handleTabClick('equipos')}
              isActive={activeTab === 'equipos'}
              className={'w-full sm:w-fit '}
              alt={'Equipos de liga'}
              title={'Equipos de liga'}
              />
          </li>
          <li className="w-full sm:w-fit" role='tab' aria-controls='liga-tab' aria-selected={activeTab === 'arbitros'}>
            <BotonTab
              id="arbitros-tab"
              label="Arbitros"
              onClick={() => handleTabClick('arbitros')}
              isActive={activeTab === 'arbitros'}
              className={'w-full sm:w-fit '}
              alt={'Arbitros de liga'}
              title={'Arbitros de liga'}
              />
          </li>
          <li className="w-full sm:w-fit" role='tab' aria-controls='liga-tab' aria-selected={activeTab === 'fixture'}>
            <BotonTab
              id="fixture-tab"
              label="Fixture"
              onClick={() => handleTabClick('fixture')}
              isActive={activeTab === 'fixture'}
              className={'w-full sm:w-fit '}
              alt={'Fechas y partidos de liga'}
              title={'Fechas y partidos de liga'}
              />
          </li>
        {patrocinadores &&(
          patrocinadores.length>0&&(  
            <li className="w-full sm:w-fit" role='tab' aria-controls='patrocinadores-tab' aria-selected={activeTab === 'patrocinadores'}>
              <BotonTab
                id="partocinadores-tab"
                label="Patrocinadores"
                onClick={() => handleTabClick('patrocinadores')}
                isActive={activeTab === 'patrocinadores'}
                className={'w-full sm:w-fit '}
                alt={'Patrocinadores de liga'}
                title={'Patrocinadores de liga'}
              />
            </li>
          )
        )}
          <li className={`hidden md:flex ml-auto items-center `}  role='tab' aria-controls='liga-tab'>
            {(user ) ? (
              <button alt='Notificaciones' title='Notificaciones' type="button" onClick={() => {setModalNotificacionesOpen(true);}} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <span className="flex justify-center items-center text-3xl ">
                    <ion-icon name="notifications-circle-outline"/>
                </span>
                </button>
                ):(
                <button alt='Informacion' title='Informacion' type="button" onClick={openModalInfo} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <span className="flex justify-center items-center text-3xl ">
                    <ion-icon name="information-circle-outline"></ion-icon>
                </span>
                </button>
                )
            }
          </li>
          <li className={`mr-2 ${((user && liga.user_id === user.id) ? 'hidden md:flex items-center' : 'hidden')}`} role='tab' aria-controls='liga-tab'>
              <Dropdown>
                  <Dropdown.Trigger>
                      <BotonOpciones 
                      alt={'Boton opciones y configuracion de liga'}
                      title={'Boton opciones y configuracion de liga'}/>
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
                        <li>
                              <BotonContenido
                                className={'mt-1 block w-full justify-center'}
                                onClick={openModalPatrocinador}
                                nombre={'Patrocinador'}
                                />

                          </li>
                      </ul>
                  </Dropdown.Content>
              </Dropdown>
          </li>
      </ul>
      <div id="defaultTabContent">
        <div className={`${activeTab === 'liga' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark.bg-gray-800`} id="liga" role="tabpanel" aria-labelledby="liga-tab">
            <TabInfoLiga 
              liga={liga} 
              user={user} 
              userAdmin={userAdmin} 
              patrocinadorConPrioridad={patrocinadorConPrioridad}
              />
        </div>
        <div className={`${activeTab === 'estadisticas' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="estadisticas" role="tabpanel" aria-labelledby="estadisticas-tab">
            <TabEstadisticasLiga 
              liga={liga} 
              user={user} 
              patrocinadorConPrioridad={patrocinadorConPrioridad}
              tablaPosiciones={tablaPosiciones}
              equipos={equipos}
              goleadores={goleadores}
              campeon={campeon}
              jugadores={jugadores}
              playoffs={fechasPlayoffs}
              partidosPlayoffs={partidosPlayoffs}
              setShowAlert={setShowAlert}
              setTituloAlert={setTituloAlert}
              rol={rol}
              votosJMV={votosJMV}
              />
        </div>
        <div className={`${activeTab === 'equipos' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="equipos" role="tabpanel" aria-labelledby="equipos-tab">
            <TabEquipos 
              fechas={fechas} 
              user={user} 
              patrocinadorConPrioridad={patrocinadorConPrioridad}
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
              usuario={user}
              arbitros={arbitros} 
              liga={liga} 
              patrocinadorConPrioridad={patrocinadorConPrioridad}
              users={users} 
              userAdmin={userAdmin} 
              userAuth={user} 
              setShowAlert={setShowAlert} 
              setTituloAlert={setTituloAlert} 
              />
        </div>
        <div className={`${activeTab === 'fixture' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="fixture" role="tabpanel" aria-labelledby="fixture-tab">
            <TabFixturePlayoffs 
               liga={liga} 
               user={user} 
               jugadorPartido={jugadorPartido} 
               partidos={partidos} 
               jugadores={jugadores} 
               calendario={calendario} 
               patrocinadorConPrioridad={patrocinadorConPrioridad}
               fechas={fechas} 
               equipos={equipos} 
               playoffs={playoffs}
               userAdmin={userAdmin}
               fechasPlayoffs={fechasPlayoffs}
               partidosPlayoffs={partidosPlayoffs}
               arbitros={arbitros} 
               users={users} 
               campeon={campeon}
               setShowAlert={setShowAlert} 
               setTituloAlert={setTituloAlert} 
               rol={rol}
              />
        </div>
        {patrocinadores&&(
          patrocinadores.length>0&&(  
            <div className={`${activeTab === 'patrocinadores' ? 'block' : 'hidden'} bg-white rounded-lg dark.bg-gray-800`} id="patrocinadores" role="tabpanel" aria-labelledby="patrocinadores-tab">
              <TabPatrocinadores
                patrocinadores={patrocinadores}
                userAdmin={userAdmin}
                user={user}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}
                liga={liga}
              />
            </div>
          )
        )}
      </div>

      {isDeleteModalOpen && (
        <ModalEliminarLiga 
          onDelete={closeDeleteModal} 
          onCancel={closeDeleteModal} 
          liga={liga} 
          />
      )}
      {isModalPatrocinadorOpen && (
        <ModalCrearPatrocinador
          liga={liga} 
          onCancel={closeModalPatrocinador} 
          onAdd={closeModalPatrocinador} 
          setShowAlert={setShowAlert} 
          setTituloAlert={setTituloAlert} 
          accion={'agregar'} 
          actionRoute={'patrocinadores.store'}
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
       {isModalInfoOpen &&(
        <ModalInformarErrores
            titulo={'Beneficios de tener cuenta en balles league'}
            cuerpo={'Si se registra en ballers league podra crear ligas y/o recibir notificaciones de todas las ligas.'}
            nombre={'Entendido'}
            closeModal={closeModalInfo}
            left={'left-[50%]'}
            />
        )}
    </div>
  );
};

export default CardLigaShow;
