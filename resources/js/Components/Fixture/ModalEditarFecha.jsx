import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

export const ModalEditarFecha = ({ liga, closeModalEditarFecha, fechaEditar, arbitros, users, setShowAlert, setTituloAlert, patch, rol, partidos, esPlayoff }) => {
    
    const formData = {
        fecha: fechaEditar.fecha ? fechaEditar.fecha : '',
        horario: fechaEditar.horario ? fechaEditar.horario : '',
        arbitro_1: fechaEditar.arbitro_1 ? fechaEditar.arbitro_1 : '',
        arbitro_2: fechaEditar.arbitro_2 ? fechaEditar.arbitro_2 : '',
    };

    const { data, setData, post, reset, setError, errors } = useForm(formData);

    const [arbitrosSelecto1, setArbitrosSelecto1] = useState(0);
    const [arbitrosSelecto2, setArbitrosSelecto2] = useState(0);
    const [partidoJugado, setPartidoJugado] = useState(null);

    useEffect(() => {
        const partido = esPlayoff ? partidos.filter((partido) => partido.fecha_partido_playoffs_id === fechaEditar.id) : partidos.filter((partido) => partido.fecha_partido_id === fechaEditar.id);
        setPartidoJugado(partido);
    }, []);
   
    return (
        <>
        {partidoJugado && partidoJugado.length > 0 ? (
            rol === 'admin' ? (
                <ModalCrearElemento
                    elementoName="Fecha"
                    actionRoute={esPlayoff ? 'fechapartidoplayoffs.update' : 'fechapartido.update'}
                    onCancel={closeModalEditarFecha}
                    onAdd={closeModalEditarFecha}
                    elemento={fechaEditar}
                    setShowAlert={setShowAlert}
                    setTituloAlert={setTituloAlert}
                    liga={liga}
                    fechas={''}
                    rol={rol}
                    setDataObj={setData}
                    leftPosition={'left-[38%]'}
                    topPosition={'top-[8%]'}
                    classNameForm={'h-full overflow-y-auto'}
                    formData = {data}
                    users={users}
                    arbitros={arbitros}
                    arbitrosSelecto1={arbitrosSelecto1}
                    arbitrosSelecto2={arbitrosSelecto2}
                    setArbitrosSelecto1={setArbitrosSelecto1}
                    setArbitrosSelecto2={setArbitrosSelecto2}
                    accion={'editar'}
                    patch={patch}
                    />
            ):(
                <ModalInformarErrores
                    titulo={'No puede editar los datos del partido ya jugado'}
                    cuerpo={'Para editar esta fecha debe comunicarse con el administrador.'}
                    nombre={'Cerrar'}
                    closeModal={closeModalEditarFecha}
                    />
            )
           
        ):(
                <ModalCrearElemento
                    elementoName="Fecha"
                    actionRoute={esPlayoff ? 'fechapartidoplayoffs.update' : 'fechapartido.update'}
                    onCancel={closeModalEditarFecha}
                    onAdd={closeModalEditarFecha}
                    elemento={fechaEditar}
                    setShowAlert={setShowAlert}
                    setTituloAlert={setTituloAlert}
                    liga={liga}
                    fechas={''}
                    rol={rol}
                    setDataObj={setData}
                    leftPosition={'left-[38%]'}
                    topPosition={'top-[8%]'}
                    classNameForm={'h-full overflow-y-auto'}
                    classNameModal={'inset-0 mb-[1%]'}
                    formData = {data}
                    users={users}
                    arbitros={arbitros}
                    arbitrosSelecto1={arbitrosSelecto1}
                    arbitrosSelecto2={arbitrosSelecto2}
                    setArbitrosSelecto1={setArbitrosSelecto1}
                    setArbitrosSelecto2={setArbitrosSelecto2}
                    accion={'editar'}
                    patch={patch}
                    />
        )}
            
        </>
    )
}
export default ModalEditarFecha;
