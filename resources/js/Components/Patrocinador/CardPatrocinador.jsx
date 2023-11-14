import React, { useState } from 'react'
import { BotonEditar, BotonEliminar, BotonOpciones } from '../BotonesAcciones';
import Dropdown from '../Dropdown';
import ModalCrearPatrocinador from './ModalCrearPatrocinador';
import ModalEliminarPatrocinador from './ModalEliminarPatrocinador';

const CardPatrocinador = ({
    patrocinador,
    userAdmin,
    user,
    liga,
    setShowAlert,
    setTituloAlert
}) => {
    const [patrocinadorEditar, setPatrocinadorEditar] = useState(null);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [patrocinadorEliminar, setPatrocinadorEliminar] = useState(null);

    const openEditarPatrocinadorModal = (patrocinador) => {
        setPatrocinadorEditar(patrocinador);
        setIsEditarModalOpen(true);
      };
    
      const closeEditarPatrocinadorModal = () => {
        setIsEditarModalOpen(false);
      };
    
      const openDeleteModal = (patrocinador) => {
        setPatrocinadorEliminar(patrocinador);
        setIsDeleteModalOpen(true);
      };
    
      const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
      };
    
  return (
    <div className={`grid ${user.id === userAdmin.id ? `grid-cols-3` : `grid-cols-2`} border rounded-lg shadow-md m-4`}>
        <div className='w-full h-auto'>
            <img src={`/images/${patrocinador.logo}?${new Date().getTime()}`} alt={`logo liga: ${patrocinador.nombre}`} className="w-auto h-auto object-cover" />
        </div>
        <div className="w-full flex justify-center items-end p-4">
            <h3 className="text-xl font-bold">{patrocinador.nombre}: <span className='text-base font-normal'>{patrocinador.descripcion}.</span></h3>
        </div>
        {user.id === userAdmin.id && (
            <div className='w-full flex justify-end items-end p-4'>
                <Dropdown>
                  <Dropdown.Trigger>
                      <BotonOpciones />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                      <ul className='p-2'>
                        <li>
                            <BotonEditar
                              onClick={() => {openEditarPatrocinadorModal(patrocinador)}}
                              className={'mt-1 block w-full justify-center'}
                              />                  
                        </li>
                        <li>
                            <BotonEliminar
                              onClick={() => {openDeleteModal(patrocinador)}}
                              className={'mt-1 block w-full justify-center'}
                              />                  
                        </li>
                      </ul>
                  </Dropdown.Content>
              </Dropdown>
            </div>
        )}
        {isEditarModalOpen &&(
            <ModalCrearPatrocinador
                liga={liga} 
                onCancel={closeEditarPatrocinadorModal} 
                onAdd={closeEditarPatrocinadorModal} 
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert} 
                patrocinador={patrocinador}
                accion={'editar'} 
                actionRoute={'patrocinadores.update'}
                />
        )}
        {isDeleteModalOpen && (
            <ModalEliminarPatrocinador
                patrocinador={patrocinador}
                onDelete={closeDeleteModal}
                onCancel={closeDeleteModal}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}
                />
        )}
    </div>
  )
}

export default CardPatrocinador