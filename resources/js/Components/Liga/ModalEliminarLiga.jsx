import React from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import { BotonCancelar, BotonEliminar } from '../BotonesAcciones';

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
      <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50 pointer-events-none"></div>

      {/* Modal */}
      <div className="fixed z-50 top-[24%] left-[2%] lg:left-[28%] w-fit border border-black rounded-lg pointer-events-auto">
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-white dark:text-white">
              Eliminar liga
            </h3>
          </div>
          <div className="p-6 space-y-6 bg-white">
            <p className="text-base leading-relaxed text-black dark:text-gray-400">
              {`¿Está seguro que desea eliminar la liga: ${liga.nombre}? Se eliminaran equipos, jugadores y fixtures.`}
            </p>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <BotonEliminar
              onClick={handleDelete}
              />
            <BotonCancelar
              onClick={onCancel}
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEliminarLiga;
