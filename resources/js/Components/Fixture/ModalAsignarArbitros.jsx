import { router } from '@inertiajs/react';
import React from 'react'
import { BotonAsignarArbitros, BotonCancelar } from '../BotonesAcciones';
import ModalCrearElemento from '../Modales/ModalCrearElemento';

export const ModalAsignarArbitros = ({ calendario, arbitros, fechas, closeModalAsignarArbitros, setShowAlert, setTituloAlert, liga }) => {

    const arbitrosConfirmados = arbitros.filter(arbitro => arbitro.confirmado === 1);

  return (
    <>
                    { arbitros &&( ((arbitrosConfirmados.length >= 2)) ? (
                        <>
                            <ModalCrearElemento
                                elementoName="Fechas"
                                actionRoute={'fechapartido.asignarArbitros'}
                                onCancel={closeModalAsignarArbitros}
                                onAdd={closeModalAsignarArbitros}
                                elemento={calendario}
                                setShowAlert={setShowAlert}
                                setTituloAlert={setTituloAlert}
                                liga={liga}
                                fechas={''}
                                leftPosition={'left-[25%]'}
                                topPosition={'top-[8%]'}
                                classNameForm={'overflow-y-auto bg-white'}
                                classNameModal={'mb-[1%]'}
                                formData = {''}
                                arbitros={arbitros}
                                accion={'editar'}
                                patch={false}
                                />
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
    </>
  )
}
export default ModalAsignarArbitros;