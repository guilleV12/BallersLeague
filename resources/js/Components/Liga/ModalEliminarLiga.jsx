import React from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

const ModalEliminarLiga = ({ onDelete, onCancel, className, liga }) => {
  const handleDelete = () => {
    router.post(route('ligas.destroy', liga.id), {
      _method: 'delete',
    },
    { onSuccess: () => {
        onDelete();
      }
    });
  };

  return (
    <>
      {/* Fondo oscuro semi-transparente */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>

      {/* Modal */}
      <div id="delete-confirmation-modal" className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-full shadow-lg border-black border rounded-lg z-50 ${className}`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white dark:text-white">
              Eliminar liga
            </h3>
          </div>
          <div className="p-6 space-y-6 bg-white">
            <p className="text-lg leading-relaxed text-black dark:text-gray-400">
              {`¿Está seguro que desea eliminar la liga: ${liga.nombre}?`}
            </p>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <PrimaryButton className='' onClick={handleDelete}>Eliminar</PrimaryButton>
            <SecondaryButton className='hover:bg-red-400' onClick={onCancel}>Cancelar</SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEliminarLiga;
