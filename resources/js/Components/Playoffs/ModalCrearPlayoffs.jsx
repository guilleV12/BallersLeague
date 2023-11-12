import React, {useEffect, useState} from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento'
import ModalInformarErrores from '../Modales/ModalInformarErrores'

export const ModalCrearPlayoffs = ({
    liga, 
    closeGenerarPlayoffModal, 
    fechas,
    partidos,
    equipos, 
    setShowAlert, 
    setTituloAlert,
    playoffs,
    fechasPlayoffs
}) => {

    const [isModalConfirmacionPlayoff, setModalConfirmacionPlayoff] = useState(false);
    const [regenerar, setRegenerar] = useState(false);
    const [faseRegularTerminada, setFaseRegularTerminada] = useState(false);

    const openModalConfirmacionPlayoff = () => {
        setModalConfirmacionPlayoff(true);
    };

    const closeModalConfirmacionPlayoff = () => {
        setModalConfirmacionPlayoff(false);
    };

    const formData = {
        cantidad_equipos: '',
        cantidad_partidos: '',
        liga_id: liga.id,
        regenerarPlayoffs: playoffs ? true : false,
    };

    useEffect(() => {
        if (partidos.length>0){
            if (partidos.length === fechas.length){
                setFaseRegularTerminada(true);
            }
        }
      }, [fechas, partidos]);

    const confirmarGenerarPlayoff = () => {
        setRegenerar(true); // Esto establece el estado cuando el usuario confirma
        setModalConfirmacionPlayoff(false);
    };

  return (
    <>
        {faseRegularTerminada === true ? (
            equipos.length >=4 ? (
                    <ModalCrearElemento
                        elementoName="Playoffs"
                        actionRoute={'playoffs.store'}
                        onCancel={closeGenerarPlayoffModal}
                        onAdd={closeGenerarPlayoffModal}
                        elemento={''}
                        setShowAlert={setShowAlert}
                        regenerar={regenerar}
                        setTituloAlert={setTituloAlert}
                        equipos={equipos}
                        liga={liga}
                        fechas={fechas}
                        leftPosition={'left-[40%]'}
                        formData = {formData}
                        accion={'agregar'}
                        fechasPlayoffs={fechasPlayoffs}
                        openModalConfirmacionPlayoff={openModalConfirmacionPlayoff}
                        />
                ) : (
                    <ModalInformarErrores
                        titulo={'No puede generar playoffs!'}
                        cuerpo={'Debe tener al menos 4 equipos para generar playoffs.'}
                        nombre={'Cerrar'}
                        closeModal={() => {closeGenerarPlayoffModal();}}
                        left={'left-[57%]'}
                        />
                )
            ) : (
                <>
                    <ModalInformarErrores
                        titulo={'Aun no puede generar playoffs!'}
                        cuerpo={'Debe terminarse la fase regular para generar playoffs.'}
                        nombre={'Cerrar'}
                        closeModal={() => {closeGenerarPlayoffModal();}}
                        left={'left-[57%]'}
                        />
                </>
            )}
            {isModalConfirmacionPlayoff && (
                <ModalInformarErrores
                    titulo={'Se eliminara el playoff actual!'}
                    cuerpo={'Para regenerar los playoffs se eliminara el actual.'}
                    nombre={'Cerrar'}
                    closeModal={() => {confirmarGenerarPlayoff();}}
                    left={'left-[54%]'}
                    />
            )}
    </>
  )
}
