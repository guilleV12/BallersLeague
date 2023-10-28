import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';

export const ModalEditarFecha = ({ liga, closeModalEditarFecha, fechaEditar, arbitros, users, setShowAlert, setTituloAlert, patch }) => {
    
    const formData = {
        fecha: fechaEditar.fecha ? fechaEditar.fecha : '',
        horario: fechaEditar.horario ? fechaEditar.horario : '',
        arbitro_1: fechaEditar.arbitro_1 ? fechaEditar.arbitro_1 : '',
        arbitro_2: fechaEditar.arbitro_2 ? fechaEditar.arbitro_2 : '',
    };

    const { data, setData, post, reset, setError, errors } = useForm(formData);

    const [arbitrosSelecto1, setArbitrosSelecto1] = useState(0);
    const [arbitrosSelecto2, setArbitrosSelecto2] = useState(0);

    return (
        <>
            <ModalCrearElemento
                elementoName="Fecha"
                actionRoute={'fechapartido.update'}
                onCancel={closeModalEditarFecha}
                onAdd={closeModalEditarFecha}
                elemento={fechaEditar}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}
                liga={liga}
                fechas={''}
                setDataObj={setData}
                leftPosition={'left-[40%]'}
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
        </>
    )
}
export default ModalEditarFecha;
