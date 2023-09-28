import React from 'react';

const ModalEliminarEquipo = ({ equipo ,onDelete, onCancel, className }) => {
  return (
    <div
      id="delete-confirmation-modal"
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto ${className}`}>
      <div className="relative w-full max-w-md max-h-full shadow-xl shadow-gray-600 broder-gray-800 border-2 rounded-lg">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
            <h3 className="text-xl font-medium text-white dark:text-white">
              Confirmar decision
            </h3>
            <button
              type="button"
              className="text-white font-bold bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-12 h-12 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onCancel}>
              <ion-icon name="close"></ion-icon>
            </button>
          </div>
          <div className="p-6 space-y-6 bg-white">
            <p className="text-lg leading-relaxed text-black dark:text-gray-400">
              {`Esta seguro que desea eliminar a ${equipo ? equipo.nombre : ''}?`}
            </p>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={onDelete}
            >
              Borrar
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarEquipo;
