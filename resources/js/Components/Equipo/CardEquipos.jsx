import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import ModalEquipo from './ModalEquipo';
import TablaPaginadaEquipos from './TablaPaginadaEquipos';

const CardEquipos = ({ user, liga, equipos, setShowAlert, setTituloAlert }) => {
  const [isAnadirModalOpen, setIsAnadirModalOpen] = useState(false);
  const [equipoEditar, setEquipoEditar] = useState(null);
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [equipoEliminar, setEquipoEliminar] = useState(null);

  const openAnadirEquipoModal = () => {
    setIsAnadirModalOpen(true);
  };

  const closeAnadirEquipoModal = () => {
    setIsAnadirModalOpen(false);
  };

  const openEditarEquipoModal = (equipo) => {
    setEquipoEditar(equipo);
    setIsEditarModalOpen(true);
  };

  const closeEditarEquipoModal = () => {
    setIsEditarModalOpen(false);
  };

  const openDeleteModal = (equipo) => {
    setEquipoEliminar(equipo);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-full shadow-md">
        <div className='flex w-full justify-center bg-black pt-1'>
            {(user.id === liga.user_id) && (
              <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white' onClick={openAnadirEquipoModal}>
                Añadir equipos <span className='text-2xl'><ion-icon name="add-circle"></ion-icon></span>
              </PrimaryButton>
            )}
            {isAnadirModalOpen && (
              <ModalEquipo equipo={''} liga={liga} onCancel={closeAnadirEquipoModal} onAdd={closeAnadirEquipoModal} onEdit={closeAnadirEquipoModal} className={''} accion={'agregar'} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
            )}
        </div>
        <TablaPaginadaEquipos liga={liga} user={user} equipos={equipos} openEditarEquipoModal={openEditarEquipoModal} openDeleteModal={openDeleteModal} equipoEditar={equipoEditar}  equipoEliminar={equipoEliminar} isDeleteModalOpen={isDeleteModalOpen} isEditarModalOpen={isEditarModalOpen} closeEditarEquipoModal={closeEditarEquipoModal} closeDeleteModal={closeDeleteModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
    </div>
  );
};

export default CardEquipos;
