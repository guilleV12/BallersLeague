import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Paginacion from '../Paginacion/Paginacion';
import TablaApi from './TablaApi';

const TablaPaginadaApi = ({ partidos }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = partidos.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className='w-full h-min-screen'>
      <TablaApi
        partidos={currentData}
        />
      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={partidos}
        elementoNombre={'Partidos'}
        handlePageChange={handlePageChange} 
        />

    </div>
  );
};

export default TablaPaginadaApi;
