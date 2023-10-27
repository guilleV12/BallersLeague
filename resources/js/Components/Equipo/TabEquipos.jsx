import React, { useState } from 'react';
import ModalCrearEquipo from './ModalCrearEquipo';
import TablaPaginadaEquipos from './TablaPaginadaEquipos';
import { BotonAnadirEquipos } from '../BotonesAcciones';

const TabEquipos = ({  fechas, user, liga, equipos, setShowAlert, setTituloAlert, calendario }) => {
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
    <div className="w-full shadow-md h-min-screen ">
        <div className='flex w-full justify-center space-x-4 py-5 bg-black'>
            {(user.id === liga.user_id) && (
              <BotonAnadirEquipos 
                onClick={openAnadirEquipoModal} 
                />
            )}

            {isAnadirModalOpen && (
              <ModalCrearEquipo 
                equipo={''} 
                fechasPartido={fechas} 
                liga={liga} 
                onCancel={closeAnadirEquipoModal} 
                onAdd={closeAnadirEquipoModal} 
                onEdit={closeAnadirEquipoModal} 
                className={''} 
                actionRoute={'equipos.store'}
                accion={'agregar'} 
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert}
                caledario={calendario}
                />
            )}
        </div>
            <TablaPaginadaEquipos 
              fechas={fechas} 
              liga={liga} 
              user={user} 
              equipos={equipos} 
              openEditarEquipoModal={openEditarEquipoModal} 
              openDeleteModal={openDeleteModal} 
              equipoEditar={equipoEditar}  
              equipoEliminar={equipoEliminar} 
              isDeleteModalOpen={isDeleteModalOpen} 
              isEditarModalOpen={isEditarModalOpen} 
              closeEditarEquipoModal={closeEditarEquipoModal} 
              closeDeleteModal={closeDeleteModal} 
              setShowAlert={setShowAlert} 
              setTituloAlert={setTituloAlert}
              />
    </div>
  );
};

export default TabEquipos;
