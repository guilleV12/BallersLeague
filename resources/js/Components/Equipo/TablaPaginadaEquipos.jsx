import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TablaEquipos from './TablaEquipos';
import Paginacion from '../Paginacion/Paginacion';

const TablaPaginadaEquipos = ({ fechas, liga, user, calendario, equipos, openEditarEquipoModal, openDeleteModal, equipoEditar, equipoEliminar, isEditarModalOpen, isDeleteModalOpen, handleDelete, closeEditarEquipoModal, closeDeleteModal, setShowAlert, setTituloAlert }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = equipos.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=' h-min-screen'>
      <TablaEquipos 
        fechas={fechas} 
        liga={liga} 
        user={user} 
        equipos={currentData} 
        openEditarEquipoModal={openEditarEquipoModal} 
        openDeleteModal={openDeleteModal} 
        equipoEditar={equipoEditar} 
        equipoEliminar={equipoEliminar} 
        isDeleteModalOpen={isDeleteModalOpen} 
        isEditarModalOpen={isEditarModalOpen} 
        handleDelete={handleDelete} 
        closeEditarEquipoModal={closeEditarEquipoModal} 
        closeDeleteModal={closeDeleteModal} 
        setShowAlert={setShowAlert} 
        setTituloAlert={setTituloAlert}
        calendario={calendario}
        />
      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={equipos}
        elementoNombre={'Equipos'}
        handlePageChange={handlePageChange} 
        />

    </div>
  );
};

export default TablaPaginadaEquipos;
