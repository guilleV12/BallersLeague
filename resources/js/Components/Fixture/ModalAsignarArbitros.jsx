import { router } from '@inertiajs/react';
import React from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

export const ModalAsignarArbitros = ({ calendario, arbitros, fechas, closeModalAsignarArbitros, setShowAlert, setTituloAlert, liga, esPlayoff }) => {

    const arbitrosConfirmados = arbitros.filter(arbitro => arbitro.confirmado === 1);

  return (
    <>
                    { arbitros &&( ((arbitrosConfirmados.length >= 2)) ? (
                        <>
                            <ModalCrearElemento
                                elementoName="Fechas"
                                actionRoute={esPlayoff ? 'fechapartidoplayoffs.asignarArbitros' : 'fechapartido.asignarArbitros'}
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
                        <ModalInformarErrores
                            titulo={'No tiene arbitros suficientes'}
                            cuerpo={'Necesita al menos dos arbitros confirmados para asignar arbitros a todas las fechas'}
                            nombre={'Cerrar'}
                            closeModal={closeModalAsignarArbitros}
                            />
                        
                    ))}
    </>
  )
}
export default ModalAsignarArbitros;