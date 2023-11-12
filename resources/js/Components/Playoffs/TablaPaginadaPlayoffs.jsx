import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TablaPlayoffs from './TablaPlayoffs';
import Paginacion from '../Paginacion/Paginacion';

const TablaPaginadaPlayoffs = ({ partidosPlayoffs, filtro, jugadorPartido, partidos, liga, fechas, equipos, arbitros, users, user, setShowAlert, setTituloAlert, jugadores, rol }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual con filtro
  const fechaFiltrada = () => {
    const fechaPartidoIds = partidosPlayoffs.map((partido) => partido.fecha_partido_playoffs_id);
    const fechasJugadas = fechas.filter((fecha) => fechaPartidoIds.includes(fecha.id));
    const fechasNoJugadas = fechas.filter((fecha) => !fechaPartidoIds.includes(fecha.id));

    if (filtro === 'jugados'){
      return fechasJugadas;
    } else if (filtro === 'nojugados'){
      return fechasNoJugadas;
    } else {
      return fechas;
    }
  };

  const fechasFiltradas = fechaFiltrada();
  
  const currentData = fechasFiltradas.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=' h-min-screen'>
        <TablaPlayoffs 
          jugadorPartido={jugadorPartido} 
          jugadores={jugadores} 
          partidos={partidosPlayoffs} 
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
        elemento={fechasFiltradas}
        elementoNombre={'Partidos de Playoffs'}
        handlePageChange={handlePageChange} 
        />
    </div>
  );
};

export default TablaPaginadaPlayoffs;
