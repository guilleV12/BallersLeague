import { router } from '@inertiajs/react';
import React from 'react'
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import { BotonAsignarArbitros, BotonCancelar } from '../BotonesAcciones';

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

    <div className="fixed  top-[23%] md:top-[20%] left-[48%] md:left-[50%] pl-[8%] md:pl-[20%] lg:left-[45%] w-fit inset-0 md:inset-0 transform -translate-x-1/2 z-50 mb-3 md:mb-2 rounded-lg overflow-y-scroll md:overflow-y-auto">
                <div className="relative border border-black bg-white rounded-lg shadow dark:bg-gray-700">
                    { arbitros &&( ((arbitrosConfirmados.length >= 2)) ? (
                        <>
                        <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-white dark:text-white">
                                    Asignar arbitros
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-base leading-relaxed text-black dark:text-gray-400">
                                    Desea asignar arbitros a todos? Si alguna fecha tiene un arbitro se reemplazara al azar.
                                </p>
                        </div>
                        <div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <BotonAsignarArbitros
                                    onClick={handleAceptar}
                                    />
                                <BotonCancelar
                                    onClick={handleCancel}
                                    />
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
                                <BotonCancelar
                                    onClick={handleCancel}
                                    />
                        </div>
                        </>
                    ))}
                        
                </div>
    </div>
    </>
  )
}
export default ModalAsignarArbitros;