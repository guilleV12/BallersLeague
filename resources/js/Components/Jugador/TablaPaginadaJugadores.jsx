import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TablaJugadores from './TablaJugadores';

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
      <TablaJugadores liga={liga} user={user} jugadores={currentData} equipo={equipo} isAnadirJugadorOpen={isAnadirJugadorOpen} openAnadirJugadorModal={openAnadirJugadorModal}
       closeAnadirJugadorModal={closeAnadirJugadorModal} openEditarJugadorModal={openEditarJugadorModal} closeEditarJugadorModal={closeEditarJugadorModal}
       isEditarJugadorOpen={isEditarJugadorOpen} jugadorEditar={jugadorEditar} openEliminarJugadorModal={openEliminarJugadorModal} closeEliminarJugadorModal={closeEliminarJugadorModal} 
       isEliminarJugadorOpen={isEliminarJugadorOpen} jugadorEliminar={jugadorEliminar} handleDelete={handleDelete} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
      <div className="flex flex-col mt-10 items-center">
        {/* Texto de ayuda */}
        <span className="text-lg text-gray-700 dark:text-gray-400">
              Mostrando{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> a{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{endIndex}</span> de{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{jugadores.length}</span> Jugadores
        </span>
        <ReactPaginate
          pageCount={Math.ceil(jugadores.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex w-full justify-center bg-white p-5 border-t border-gray-200 rounded-lg shadow'} // Clase para el contenedor principal
          activeClassName={' bg-orange-500 text-white flex justify-center items-center'} // Clase para la página actual
          previousClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para el botón "Anterior"
          nextClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para el botón "Siguiente"
          pageClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 border border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para las páginas
        />
      </div>
    </div>
  );
};

export default TablaPaginadaJugadores;
