import React from 'react';
import { router } from '@inertiajs/react';
import { BotonCancelar, BotonContenido } from '../BotonesAcciones';

export const ModalConfirmar = ({ closeConfirmarModal, arbitro, liga, setShowAlert, setTituloAlert }) => {
    const aceptar = () => {
            closeConfirmarModal();
            router.post(route('arbitros.aceptar',arbitro.id), {
            _method: 'patch',
            }, {onSuccess: () => {
                setShowAlert(true);
                setTituloAlert('Inivitacion a arbitrar aceptada!');
            }})
      };
      const rechazar = () => {
            closeConfirmarModal();
            router.delete(route('arbitros.destroy',arbitro.id), {
            onSuccess: () => {
                setShowAlert(true);
                setTituloAlert('Invitacion a arbitrar rechazada!');
            }
        })
      };
return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[75] bg-black opacity-50"></div>

    <div className={`fixed top-1/2 left-[38%] w-fit -translate-y-1/2 max-h-full shadow-lg border-black border rounded-lg z-[80]`}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-center p-5 border-b rounded-t-lg bg-orange-500 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-white dark:text-white">
                                    Invitacion para arbitrar en la liga 
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-base leading-relaxed text-black dark:text-gray-400">
                                    {`Desea arbitrar en la liga ${liga.nombre}?`}
                                </p>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <BotonContenido
                                    onClick={aceptar}
                                    nombre={'Aceptar'}
                                    />
                                <BotonContenido
                                    onClick={rechazar}
                                    nombre={'Rechazar'}
                                    />
                                <BotonContenido
                                    onClick={closeConfirmarModal}
                                    nombre={'Cerrar'}
                                    />
                        </div>
                </div>
    </div>
    </>
  )
}
export default ModalConfirmar;