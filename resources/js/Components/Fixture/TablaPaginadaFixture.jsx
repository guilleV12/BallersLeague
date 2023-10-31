import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TablaFixture from './TablaFixture';
import Paginacion from '../Paginacion/Paginacion';

const TablaPaginadaFixture = ({ jugadorPartido, partidos, liga, fechas, equipos, arbitros, users, user, setShowAlert, setTituloAlert, jugadores, rol }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = fechas.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=' h-min-screen'>
        <TablaFixture 
          jugadorPartido={jugadorPartido} 
          jugadores={jugadores} 
          partidos={partidos} 
          fechas={currentData} 
          equipos={equipos} 
          arbitros={arbitros} 
          liga={liga} 
          users={users} 
          user={user} 
          setShowAlert={setShowAlert} 
          setTituloAlert={setTituloAlert}
          rol={rol}
          />

      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={fechas}
        elementoNombre={'Partidos'}
        handlePageChange={handlePageChange} 
        />
    </div>
  );
};

export default TablaPaginadaFixture;
