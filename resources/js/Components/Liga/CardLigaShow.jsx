import React, { useState } from 'react';
import { CardEstadisticasLiga } from './CardEstadisticasLiga';
import CardEquipos from '../Equipo/CardEquipos';
import CardEditarLiga from './CardEditarLiga';
import PrimaryButton from '../PrimaryButton';
import ModalEliminarLiga from './ModalEliminarLiga';
import { TabInfoLiga } from './TabInfoLiga';
import Dropdown from '../Dropdown';
import { ModalAddArbitro } from './ModalAddArbitro';
import { TabArbitros } from '../Arbitros/TabArbitros';
import Alert from '../Alerts/Alert';
import TabFixture from '../Fixture/TabFixture';
import { ModalGenerarFixture } from '../Fixture/ModalGenerarFixture';
import ModalDeleteFixture from '../Fixture/ModalDeleteFixture';

export const CardLigaShow = ({ jugadorPartido, partidos, jugadores, liga, user, equipos, userAdmin, arbitros, users, calendario, fechas }) => {
  const [activeTab, setActiveTab] = useState('liga'); // Tab inicialmente activo
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the delete modal
  const [isAnadirArbitroModalOpen, setIsAnadirArbitroModalOpen] = useState(false); // State to manage the delete modal
  const [showAlert, setShowAlert] = useState(false);
  const [tituloAlert, setTituloAlert] = useState('');
  const [isGenerarFixtureOpen, setGenerarFixtureOpen] = useState(false);
  const [isDeleteFixtureOpen, setDeleteFixtureOpen] = useState(false);

  const openDeleteFixtureModal = () => {
    setDeleteFixtureOpen(true);
  };
  const closeDeleteFixtureModal = () => {
    setDeleteFixtureOpen(false);
  };
  const openGenerarFixtureModal = () => {
    setGenerarFixtureOpen(true);
  };
  const closeGenerarFixtureModal = () => {
    setGenerarFixtureOpen(false);
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
  const openAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(true);
  };
  const closeAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(false);
  };
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={`w-full my-10 ml-[10%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isDeleteModalOpen ? `pointer-events-none` : ''}`}>
          <ul className="flex flex-wrap justify-between text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
              <div className='flex'>  
                    <li className="mr-2">
                        <button id="liga-tab" onClick={() => handleTabClick('liga')} data-tabs-target="#liga" type="button" role="tab" aria-controls="liga" aria-selected={activeTab === 'liga'} className={`inline-block p-4 rounded-tl-lg text-black hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-orange-500 ${ activeTab === 'liga' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
                            <p className='text-xl font-semibold'>Liga</p>
                        </button>
                    </li>
                    <li className="mr-2">
                        <button id="estadisticas-tab" onClick={() => handleTabClick('estadisticas')} data-tabs-target="#estadisticas" type="button" role="tab" aria-controls="estadisticas" aria-selected={activeTab === 'estadisticas'} className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'estadisticas' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
                            <p className='text-xl font-semibold'>Estadisticas</p>
                        </button>
                    </li>
                    <li className="mr-2">
                        <button id="equipos-tab" onClick={() => handleTabClick('equipos')} data-tabs-target="#equipos" type="button" role="tab" aria-controls="equipos" aria-selected={activeTab === 'equipos'} className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'equipos' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
                            <p className='text-xl font-semibold'>Equipos</p>
                        </button>
                    </li>
                    <li className="mr-2">
                        <button id="arbitros-tab" onClick={() => handleTabClick('arbitros')} data-tabs-target="#arbitros" type="button" role="tab" aria-controls="arbitros" aria-selected={activeTab === 'arbitros'} className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'arbitros' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
                            <p className='text-xl font-semibold'>Arbitros</p>
                        </button>
                    </li>
                    <li className="mr-2">
                        <button id="fixture-tab" onClick={() => handleTabClick('fixture')} data-tabs-target="#fixture" type="button" role="tab" aria-controls="fixture" aria-selected={activeTab === 'fixture'} className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'fixture' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
                            <p className='text-xl font-semibold'>Fixture</p>
                        </button>
                    </li>
              </div>
              <div className='flex '>
                    <li className={`mr-2 ${(liga.user_id === user.id ? '' : 'hidden')} flex p-2`}>
                        <Dropdown>
                            <Dropdown.Trigger>
                                  <span className='text-3xl text-orange-500 font-bold hover:cursor-pointer'>
                                        <ion-icon name="options"></ion-icon>
                                  </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                  <ul className='p-2'>
                                      <li>
                                          <PrimaryButton className='flex justify-center w-full bg-orange-500 text-xl hover:bg-orange-600 hover:text-white' onClick={openEditModal}>Editar Liga</PrimaryButton>
                                      </li>
                                      <li>
                                          <PrimaryButton className='flex justify-center w-full bg-orange-500 text-xl hover:bg-orange-600 hover:text-white mt-1' onClick={openDeleteModal}>Eliminar Liga</PrimaryButton>
                                      </li>
                                                                            
                                  </ul>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
              </div>
          </ul>
          {isDeleteModalOpen &&(<ModalEliminarLiga onDelete={closeDeleteModal} onCancel={closeDeleteModal} className={'pointer-events-auto'} liga={liga} /> )}
          {isEditModalOpen &&(<CardEditarLiga setTituloAlert={setTituloAlert} user={user} liga={liga} onCancel={closeEditModal} onEdit={closeEditModal} className={'pointer-events-auto'} setShowAlert={setShowAlert}/>)}
          {isAnadirArbitroModalOpen &&(<ModalAddArbitro liga={liga} accion={'agregar'} onCancel={closeAnadirArbitroModal} onAdd={closeAnadirArbitroModal} className={'pointer-events-auto'} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
          {isGenerarFixtureOpen &&(<ModalGenerarFixture equipos={equipos} calendario={calendario} fechas={fechas} liga={liga} closeGenerarFixtureModal={closeGenerarFixtureModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
          {isDeleteFixtureOpen &&(<ModalDeleteFixture calendario={calendario} fechas={fechas} liga={liga} closeDeleteFixtureModal={closeDeleteFixtureModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
          <div id="defaultTabContent">
              <div className={`${activeTab === 'liga' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="liga" role="tabpanel" aria-labelledby="liga-tab">
                  <TabInfoLiga liga={liga} user={user} userAdmin={userAdmin}/>
              </div>
              <div className={`${activeTab === 'estadisticas' ? 'block' : 'hidden'} bg-white rounded-lg  dark:bg-gray-800`} id="estadisticas" role="tabpanel" aria-labelledby="estadisticas-tab">
                    <CardEstadisticasLiga liga={liga} user={user}/>
              </div>
              <div className={`${activeTab === 'equipos' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="equipos" role="tabpanel" aria-labelledby="equipos-tab">
                    <CardEquipos fechas={fechas} user={user} liga={liga} equipos={equipos} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
              </div>
              <div className={`${activeTab === 'arbitros' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="arbitros" role="tabpanel" aria-labelledby="arbitros-tab">
                    <TabArbitros arbitros={arbitros} liga={liga} users={users} userAdmin={userAdmin} userAuth={user} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert} openAnadirArbitroModal={openAnadirArbitroModal}/>
              </div>
              <div className={`${activeTab === 'fixture' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="fixture" role="tabpanel" aria-labelledby="fixture-tab">
                    <TabFixture jugadorPartido={jugadorPartido} partidos={partidos} jugadores={jugadores} openDeleteFixtureModal={openDeleteFixtureModal} openGenerarFixtureModal={openGenerarFixtureModal} user={user} calendario={calendario} fechas={fechas} equipos={equipos} arbitros={arbitros} liga={liga} users={users} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
              </div>
          </div>
          {showAlert &&(<Alert titulo={tituloAlert} texto={''} tiempo={3000} showAlert={showAlert} icono={'success'} closeAlert={closeAlert}/>)}
    </div>
  );
};