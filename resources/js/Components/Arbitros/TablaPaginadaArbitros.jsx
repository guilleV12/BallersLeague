import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Paginacion from '../Paginacion/Paginacion';
import TablaArbitros from './TablaArbitros';

const TablaPaginadaEquipos = ({ arbitros, openDeleteModal, user, openConfirmarModal, users, userAdmin, userAuth, liga, setShowAlert, setTituloAlert, fechas, partidos }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = arbitros.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=' h-min-screen'>
      <TablaArbitros
        openDeleteModal={openDeleteModal}
        arbitros={currentData}
        user={user}
        liga={liga}
        users={users}
        openConfirmarModal={openConfirmarModal} 
        userAdmin={userAdmin}
        userAuth={userAuth}
        />
      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={arbitros}
        elementoNombre={'Arbitros'}
        handlePageChange={handlePageChange} 
        />

    </div>
  );
};

export default TablaPaginadaEquipos;
