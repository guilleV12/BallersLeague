import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CardLiga } from './CardLiga';

function TablaPaginada({ data, user, className, users, patrocinadores }) {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage; 
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = data.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className={`${className}`}>

        <table className='w-full'>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td className='flex justify-center'><CardLiga patrocinadores={patrocinadores} path={item.logo} liga={item} className={'bg-white rounded-lg w-full h-2/4 border border-black shadow-lg shadow-gray-500 px-1 py-2 md:px-10 md:py-5'}/></td>
                </tr>
              ))}
            </tbody>
        </table>

        <div className="flex flex-col items-center mt-5 ">
            {/* Texto de ayuda */}
            <span className="text-lg text-gray-700 dark:text-gray-400">
              Mostrando{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> a{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{endIndex}</span> de{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span> Ligas
            </span>
            {/* Componente de paginación */}
            <ReactPaginate
              pageCount={Math.ceil(data.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex w-[90%] justify-center bg-white rounded-lg h-3/4 border border-black shadow-lg shadow-gray-500 px-10 py-5'} // Clase para el contenedor principal
              activeClassName={' bg-orange-500 text-white flex justify-center items-center'} // Clase para la página actual
              previousClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para el botón "Anterior"
              nextClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para el botón "Siguiente"
              pageClassName={'flex justify-center items-center px-3 h-10 text-xl font-medium text-white bg-gray-800 border border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} // Clase para las páginas
            />
        </div>

    </div>
  );
}

export default TablaPaginada;
