import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import { CardEstadisticasLiga } from './CardEstadisticasLiga';
import CardEquipos from '../Equipo/CardEquipos';
import CardEditarLiga from './CardEditarLiga';
import PrimaryButton from '../PrimaryButton';
import ModalEliminarLiga from './ModalEliminarLiga';
import { TabInfoLiga } from './TabInfoLiga';
import Dropdown from '../Dropdown';
import { ModalAddArbitro } from './ModalAddArbitro';
import { TabArbitros } from '../Arbitros/TabArbitros';

export const CardLigaShow = ({ liga, user, equipos, userAdmin, arbitros, users }) => {
  const [activeTab, setActiveTab] = useState('liga'); // Tab inicialmente activo
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the delete modal
  const [isAnadirArbitroModalOpen, setIsAnadirArbitroModalOpen] = useState(false); // State to manage the delete modal
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
  const handleDelete = () => {
    closeDeleteModal();
    router.post(route('ligas.destroy',liga.id), {
      _method: 'delete',
    })
  };

  return (
    <div className={`w-2/3 my-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isDeleteModalOpen ? `pointer-events-none` : ''}`}>
     
      <ul className="flex flex-wrap justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        <div className='flex'>  
          <li className="mr-2">
            <button id="liga-tab" onClick={() => handleTabClick('liga')} data-tabs-target="#liga" type="button" role="tab" aria-controls="liga" aria-selected={activeTab === 'liga'}
              className={`inline-block p-4 rounded-tl-lg text-black hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-orange-500 ${ activeTab === 'liga' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
              <p className='text-xl font-bold'>Liga</p>
            </button>
          </li>
          <li className="mr-2">
            <button id="estadisticas-tab" onClick={() => handleTabClick('estadisticas')} data-tabs-target="#estadisticas" type="button" role="tab" aria-controls="estadisticas" aria-selected={activeTab === 'estadisticas'}
              className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'estadisticas' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
              <p className='text-xl font-bold'>Estadisticas</p>
            </button>
          </li>
          <li className="mr-2">
            <button id="equipos-tab" onClick={() => handleTabClick('equipos')} data-tabs-target="#equipos" type="button" role="tab" aria-controls="equipos" aria-selected={activeTab === 'equipos'}
              className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'equipos' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
              <p className='text-xl font-bold'>Equipos</p>
            </button>
          </li>
          <li className="mr-2">
            <button id="arbitros-tab" onClick={() => handleTabClick('arbitros')} data-tabs-target="#arbitros" type="button" role="tab" aria-controls="arbitros" aria-selected={activeTab === 'arbitros'}
              className={`inline-block p-4 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${ activeTab === 'arbitros' ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''}`}>
              <p className='text-xl font-bold'>Arbitros</p>
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
                      <ul>
                        <li>
                          <PrimaryButton className='flex justify-center w-full bg-orange-500 text-xl hover:bg-orange-600 hover:text-white' onClick={openEditModal}>Editar</PrimaryButton>
                        </li>
                        <li>
                          <PrimaryButton className='flex justify-center w-full bg-orange-500 text-xl hover:bg-orange-600 hover:text-white mt-1' onClick={openDeleteModal}>Eliminar</PrimaryButton>
                        </li>
                        <li>
                          <PrimaryButton className='flex justify-center w-full bg-orange-500 text-xl hover:bg-orange-600 hover:text-white mt-1' onClick={openAnadirArbitroModal}>Anadir arbitro</PrimaryButton>
                        </li>
                      </ul>
                </Dropdown.Content>
            </Dropdown>
          </li>
        </div>
        {/* Render the delete confirmation modal */}
        {(isDeleteModalOpen === true) ? ( 
            <ModalEliminarLiga onDelete={handleDelete} onCancel={closeDeleteModal} className={'pointer-events-auto'}/>
          ) : (
            <ModalEliminarLiga className='hidden' onDelete={handleDelete} onCancel={closeDeleteModal} />
          )}
      </ul>
      {(isEditModalOpen === true) ? ( 
            <CardEditarLiga user={user} liga={liga} onCancel={closeEditModal} onEdit={closeEditModal} className={'pointer-events-auto'}/>
          ) : (
            ''
      )}
    {(isAnadirArbitroModalOpen === true) ? ( 
                <ModalAddArbitro liga={liga} accion={'agregar'} onCancel={closeAnadirArbitroModal} onAdd={closeAnadirArbitroModal} className={'pointer-events-auto'}/>
              ) : (
                ''
          )}
      <div id="defaultTabContent">
          <div className={`${activeTab === 'liga' ? 'block' : 'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="liga" role="tabpanel" aria-labelledby="liga-tab">
              {/* Contenido del tab 'liga' */}
              <TabInfoLiga liga={liga} user={user} userAdmin={userAdmin}></TabInfoLiga>
          </div>
          <div className={`${activeTab === 'estadisticas' ? 'block' : 'hidden'} bg-white rounded-lg  dark:bg-gray-800`} id="estadisticas" role="tabpanel" aria-labelledby="estadisticas-tab">
                {/* Contenido del tab 'estadisticas' */}
                <CardEstadisticasLiga liga={liga} user={user}></CardEstadisticasLiga>
          </div>
          <div className={`${activeTab === 'equipos' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="equipos" role="tabpanel" aria-labelledby="equipos-tab">
                {/* Contenido del tab 'equipos' */}
                <CardEquipos user={user} liga={liga} equipos={equipos}></CardEquipos>
          </div>
          <div className={`${activeTab === 'arbitros' ? 'block' : 'hidden'} bg-white rounded-lg dark:bg-gray-800`} id="arbitros" role="tabpanel" aria-labelledby="arbitros-tab">
                {/* Contenido del tab 'equipos' */}
                <TabArbitros arbitros={arbitros} liga={liga} users={users} userAdmin={userAdmin} userAuth={user}></TabArbitros>
          </div>
      </div>

    </div>
  );
};
