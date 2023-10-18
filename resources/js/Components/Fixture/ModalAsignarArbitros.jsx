import { router } from '@inertiajs/react';
import React from 'react'
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

export const ModalAsignarArbitros = ({ calendario, arbitros, fechas, closeModalAsignarArbitros, setShowAlert, setTituloAlert }) => {
    const handleCancel = () =>{
        closeModalAsignarArbitros();
    };

    console.log(fechas[0].calendario_id);
    const handleAceptar = () =>{
        router.post(route('fechapartido.asignarArbitros',calendario.id), {
            _method: 'put',
        }, 
        {onSuccess: ()=> {
            setShowAlert(true);
            setTituloAlert('Arbitros asignados con exito!');
        }})
        closeModalAsignarArbitros();
    };

    const arbitrosConfirmados = arbitros.filter(arbitro => arbitro.confirmado === 1);

  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>

    <div id="delete-confirmation-modal" className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-full shadow-lg border-black border rounded-lg z-50`}>
        <div className="relative w-full max-w-md max-h-full rounded-lg">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    { arbitros &&( ((arbitrosConfirmados.length >= 2)) ? (
                        <>
                        <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white dark:text-white">
                                    Asignar arbitros
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                                    Desea asignar arbitros a todos? Si alguna fecha tiene un arbitro se reemplazara al azar.
                                </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <PrimaryButton className='' onClick={handleAceptar}>Asignar arbitros</PrimaryButton>
                                <SecondaryButton onClick={handleCancel}>Cancelar</SecondaryButton>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white dark:text-white">
                                    No tiene arbitros suficientes!
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                                    Necesita al menos dos arbitros confirmados para asignar arbitros a todas las fechas.
                                </p>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <SecondaryButton onClick={handleCancel} className='hover:bg-red-400'>Cerrar</SecondaryButton>
                        </div>
                        </>
                    ))}
                        
                </div>
        </div>
    </div>
    </>
  )
}
export default ModalAsignarArbitros;