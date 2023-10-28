import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TablaJugadores from './TablaJugadores';
import Paginacion from '../Paginacion/Paginacion';

const TablaPaginadaJugadores = ({ liga, user, jugadores, equipo, isAnadirJugadorOpen, openAnadirJugadorModal, closeAnadirJugadorModal, openEditarJugadorModal,
closeEditarJugadorModal, isEditarJugadorOpen, jugadorEditar, openEliminarJugadorModal, closeEliminarJugadorModal, isEliminarJugadorOpen, jugadorEliminar, handleDelete, setShowAlert, setTituloAlert }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = jugadores.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <TablaJugadores 
        liga={liga} 
        user={user} 
        jugadores={currentData} 
        equipo={equipo} 
        isAnadirJugadorOpen={isAnadirJugadorOpen} 
        openAnadirJugadorModal={openAnadirJugadorModal}
        closeAnadirJugadorModal={closeAnadirJugadorModal} 
        openEditarJugadorModal={openEditarJugadorModal} 
        closeEditarJugadorModal={closeEditarJugadorModal}
        isEditarJugadorOpen={isEditarJugadorOpen} 
        jugadorEditar={jugadorEditar} 
        openEliminarJugadorModal={openEliminarJugadorModal} 
        closeEliminarJugadorModal={closeEliminarJugadorModal} 
        isEliminarJugadorOpen={isEliminarJugadorOpen} 
        jugadorEliminar={jugadorEliminar} 
        handleDelete={handleDelete} 
        setShowAlert={setShowAlert} 
        setTituloAlert={setTituloAlert}
        />

      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={jugadores}
        elementoNombre={'Jugadores'}
        handlePageChange={handlePageChange} 
        />
    </div>
  );
};

export default TablaPaginadaJugadores;
