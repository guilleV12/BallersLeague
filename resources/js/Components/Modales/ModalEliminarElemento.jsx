import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { BotonCancelar, BotonEliminar } from '../BotonesAcciones';

const ModalEliminarElemento = ({ 
    nombreElemento, 
    nombreRuta, 
    elemento, 
    onDelete, 
    onCancel, 
    leftPosition, 
    setShowAlert, 
    setTituloAlert, 
    fechas, 
    message, 
    tipoElemento, 
    patch,
    formData
}) => {
  const [canDelete, setCanDelete] = useState(true);
  const arrayNoFechas = ['partido','fixture','equipo','jugador'];

  useEffect(() => {
    if (!arrayNoFechas.includes(tipoElemento)){
      if (fechas && fechas.length > 0) {
        // Verificar si el elemento está asociado a fechas
        if (tipoElemento === 'arbitro') {
          const elementoEnFechas = fechas.some((fecha) =>
            fecha.arbitro_1 === elemento.id || fecha.arbitro_2 === elemento.id
          );
          if (elementoEnFechas) {
            setCanDelete(false);
          }
        } else if (tipoElemento === 'equipo') {
          // Personaliza la lógica para equipos, por ejemplo
          // Puedes verificar si el elemento está asociado a fechas de otra manera
        }
      }
    }
  }, [elemento, fechas, tipoElemento]);

  const handleDelete = () => {
    if (nombreRuta === 'partido.destroy'){
      router.post(route(`${nombreRuta}`, elemento.id), {
        ...formData,
        _method: 'delete',
      }, {
      onSuccess: () => {
        onDelete();
        setShowAlert(true);
        setTituloAlert(`${nombreElemento} eliminado con éxito.`);
      },
      });
    }else{
      router.post(route(`${nombreRuta}`, elemento.id), {
        _method: patch?'patch':'delete',
      }, {
      onSuccess: () => {
        onDelete();
        setShowAlert(true);
        setTituloAlert(`${nombreElemento} eliminado con éxito.`);
      },
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[65] bg-black opacity-50 pointer-events-none"></div>

      {/* Modal */}
      <div className={`fixed z-[70] top-[24%] ${leftPosition} w-fit border border-black rounded-lg pointer-events-auto`}>
      <div className="bg-white rounded-lg">
          <div className="relative bg-white rounded-lg shadow dark-bg-gray-700">
            <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                Confirmar decisión
              </h3>
            </div>
            <div className="p-6 space-y-6 bg-white">
              <p className="text-base leading-relaxed text-black dark:text-gray-400">
                {canDelete
                  ? message
                  : `No puede eliminar a ${nombreElemento} porque está asociado a fechas.`}
              </p>
            </div>
            <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              {canDelete ? (
                tipoElemento === 'arbitro' ? (
                    <BotonEliminar 
                      onClick={handleDelete} 
                      />
                ) : (
                    <BotonEliminar 
                      onClick={handleDelete} 
                      />
                )
              ) : null}
              <BotonCancelar 
                onClick={onCancel} 
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEliminarElemento;
