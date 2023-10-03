import React from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

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
    <div id="delete-confirmation-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto`}>
        <div className="relative w-full max-w-md max-h-full shadow-lg border-black border rounded-lg">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-xl font-medium text-white dark:text-white">
                                    Invitacion para arbitrar en la liga 
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                                    {`Desea arbitrar en la liga ${liga.nombre}?`}
                                </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <PrimaryButton className='' onClick={aceptar}>Aceptar</PrimaryButton>
                                <SecondaryButton className='hover:bg-red-400' onClick={rechazar}>Rechazar</SecondaryButton>
                        </div>
                </div>
        </div>
    </div>
  )
}
