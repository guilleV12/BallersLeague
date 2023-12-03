import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { BotonCancelar, BotonContenido, BotonEliminar } from '../BotonesAcciones';

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
    formData,
    partidos,
    rol
}) => {
  const [canDelete, setCanDelete] = useState(true);
  const arrayNoFechas = ['partido','fixture','jugador','patrocinador'];

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
          if (partidos && partidos.length > 0){
              setCanDelete(false);
          }
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
        canDelete,
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
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[75] bg-black opacity-50 pointer-events-auto"></div>

      {/* Modal */}
      <div className={`fixed z-[80] top-[24%] ${leftPosition} w-fit border border-black rounded-lg`}>
      <div className="bg-white rounded-lg">
          <div className="relative bg-white rounded-lg shadow dark-bg-gray-700">
            <div className="flex items-center justify-center p-5 border-b rounded-t-lg bg-orange-500 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                Confirmar decisión
              </h3>
            </div>
            <div className="p-6 space-y-6 bg-white">
              <p className="text-base leading-relaxed text-black dark:text-gray-400">
                {message}
              </p>
            </div>
            <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              {tipoElemento === 'equipo' ? (
                canDelete === true ? (
                  <>
                  <BotonEliminar 
                    onClick={handleDelete} 
                    />
                    
                  <BotonCancelar 
                    onClick={onCancel} 
                    />
                  </>
                ) : (
                  <BotonContenido
                    nombre={'Cerrar'}
                    onClick={onCancel}
                    />
                )
              ):(
                tipoElemento === 'partido' ? (
                  rol === 'admin' ? (
                    <>
                      <BotonEliminar 
                        onClick={handleDelete} 
                        />
                      
                      <BotonCancelar 
                        onClick={onCancel} 
                        />
                    </>
                  ):( 
                    <BotonContenido
                      nombre={'Cerrar'}
                      onClick={onCancel}
                      />
                    )
                ):(
                  <>
                  <BotonEliminar 
                    onClick={handleDelete} 
                    />
                  
                  <BotonCancelar 
                    onClick={onCancel} 
                    />
                  </>
                )
              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEliminarElemento;
