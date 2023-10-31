import React, { useState } from 'react';
import ModalEliminarArbitro from './ModalEliminarArbitro';
import ModalConfirmar from './ModalConfirmar';
import ModalCrearArbitro from './ModalCrearArbitro';
import { BotonAnadirArbitros } from '../BotonesAcciones';
import TablaPaginadaArbitros from './TablaPaginadaArbitros';

const TabArbitros = ({ arbitros, users, userAdmin, userAuth, liga, setShowAlert, setTituloAlert, fechas, partidos }) => {
  const [arbitroEliminar, setArbitroEliminar] = useState(null);
  const [arbitroConfirmar, setArbitroConfirmar] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmarModalOpen, setIsConfirmarModalOpen] = useState(false);
  const [isAnadirArbitroModalOpen, setIsAnadirArbitroModalOpen] = useState(false);

  const openDeleteModal = (usuario, arbitro) => {
    setArbitroEliminar(arbitro);
    setUser(usuario);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openConfirmarModal = (arbitro) => {
    setArbitroConfirmar(arbitro);
    setIsConfirmarModalOpen(true);
  };

  const closeConfirmarModal = () => {
    setIsConfirmarModalOpen(false);
  };

  const openAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(true);
  };

  const closeAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(false);
  };

  const arbitrosFiltrados = arbitros.filter(arbitro => arbitro.deshabilitado === 0);

  return (
    <div className='grid grid-cols-1 justify-center'>
      {isConfirmarModalOpen && (
        <ModalConfirmar
          closeConfirmarModal={closeConfirmarModal}
          arbitro={arbitroConfirmar}
          liga={liga}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {isDeleteModalOpen && (
        <ModalEliminarArbitro
          fechas={fechas}
          partidos={partidos}
          arbitro={arbitroEliminar}
          user={user}
          onDelete={closeDeleteModal}
          onCancel={closeDeleteModal}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {isAnadirArbitroModalOpen && (
        <ModalCrearArbitro
          liga={liga} 
          onCancel={closeAnadirArbitroModal}
          onAdd={closeAnadirArbitroModal}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {userAdmin.id === userAuth.id && (
        <div className="flex w-full justify-center space-x-4 py-5 bg-black">
          <BotonAnadirArbitros 
            onClick={openAnadirArbitroModal} 
            />
        </div>
      )}
        
        <TablaPaginadaArbitros
          arbitros={arbitrosFiltrados}
          users={users}
          userAdmin={userAdmin}
          userAuth={userAuth}
          liga={liga}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
          fechas={fechas}
          partidos={partidos}
          openDeleteModal={openDeleteModal}
          openConfirmarModal={openConfirmarModal}
          /> 
        
    </div>
  )
}
export default TabArbitros;
