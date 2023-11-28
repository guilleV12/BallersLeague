import React from 'react';
import { BotonContenido } from '../BotonesAcciones';

const ModalInformarErrores = ({ titulo, cuerpo, accion, nombre, esEmpate, equipos, equipoError, closeModal, left, errorPuntos, confirmar }) => {
  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[75] bg-black opacity-50"></div>
    <div className={`fixed top-1/2 ${left?left:`left-1/2`} transform -translate-x-1/2 -translate-y-1/2 max-h-full shadow-lg border-black border rounded-lg z-[80] `}>
      <div className="relative w-fit max-h-full rounded-lg">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-center p-5 border-b rounded-t-lg bg-orange-500 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white dark:text-white">
              {esEmpate === true ? ('Empate!') : (titulo)}
            </h3>
          </div>
          <div className="p-6 space-y-6 bg-white">
            <p className="text-base leading-relaxed text-black dark:text-gray-400">
              {errorPuntos&&(esEmpate === true ? ('El puntaje de ambos equipos indica un empate, por favor revise de nuevo.') : (
                equipos
                  .filter((equipo) => equipoError === equipo.id)
                  .map((equipo) => (
                    `Los puntos totales del equipo ${equipo.nombre} no coinciden con los puntos totales de los jugadores.`
                  ))
              ))}
              {cuerpo &&(
                cuerpo
              )}
            </p>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            {accion && accion === 'confirmar' ? (
              <>
              <BotonContenido
                onClick={confirmar}
                nombre={'Entendido'}
                />
              <BotonContenido
                onClick={closeModal}
                nombre={'Cancelar'}
                />
              </>
            ):(
              <BotonContenido
                onClick={closeModal}
                nombre={nombre}
                />
            )}
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalInformarErrores;
