import React, {useState} from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento'
import ModalInformarErrores from '../Modales/ModalInformarErrores'

export const ModalCrearFixture = ({ liga, closeGenerarFixtureModal, fechas, equipos, setShowAlert, setTituloAlert }) => {
    const [isModalConfirmacionFixture, setModalConfirmacionFixture] = useState(false);
    const [regenerar, setRegenerar] = useState(false);

    const openModalConfirmacionFixture = () => {
        setModalConfirmacionFixture(true);
    };

    const closeModalConfirmacionFixture = () => {
        setModalConfirmacionFixture(false);
    };

    const formData = {
        fecha_inicial: '',
        cantidad_vueltas: '',
        liga_id: liga.id,
        regenerarFixture: '',
    };

    const confirmarGenerarFixture = () => {
        setRegenerar(true); // Esto establece el estado cuando el usuario confirma
        closeModalConfirmacionFixture();
    };
   

  return (
    <>
            {equipos &&( equipos.length > 1 ? (
                <ModalCrearElemento
                    elementoName="Fixture"
                    actionRoute={'calendario.store'}
                    onCancel={closeGenerarFixtureModal}
                    onAdd={closeGenerarFixtureModal}
                    elemento={''}
                    setShowAlert={setShowAlert}
                    regenerar={regenerar}
                    setTituloAlert={setTituloAlert}
                    liga={liga}
                    fechas={fechas}
                    leftPosition={'left-[40%]'}
                    formData = {formData}
                    accion={'agregar'}
                    openModalConfirmacionFixture={openModalConfirmacionFixture}
                    />
            ) : (
                <>
                    <ModalInformarErrores
                        titulo={'No hay suficientes equipos!'}
                        cuerpo={'Necesita al menos 2 equipos para crear un fixture.'}
                        nombre={'Cerrar'}
                        closeModal={() => {closeGenerarFixtureModal();}}
                        left={'left-[57%]'}
                        />
                </>
            ))}
               
        {isModalConfirmacionFixture && (
            <ModalInformarErrores
                titulo={'Se eliminara el fixture actual!'}
                cuerpo={'Para regenerar el fixture se eliminara el actual.'}
                nombre={'Cerrar'}
                closeModal={() => {confirmarGenerarFixture();}}
                left={'left-[54%]'}
                />
        )}
    </>
        )
}
export default ModalCrearFixture;