import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';

const ModalCrearPatrocinador = ({ liga, onCancel, onAdd, setShowAlert, patrocinador, setTituloAlert, accion, actionRoute }) => {
    const data = {
        nombre: (accion === 'agregar' ? '' : patrocinador.nombre),
        descripcion: (accion === 'agregar' ? '' : patrocinador.descripcion),
        logo: undefined,
        liga_patrocinada:liga.id,
        prioridad:patrocinador ? (patrocinador.prioridad === 0 ? false : true) : false,
    };

  return (
        <ModalCrearElemento
            elementoName="Patrocinador"
            actionRoute={actionRoute}
            onCancel={onCancel}
            onAdd={onAdd}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            liga={liga}
            leftPosition={'left-[35%]'}
            elemento={accion === 'editar' ? patrocinador : null}
            topPosition={'top-[10%]'}
            classNameForm={' overflow-y-auto inset-0 '}
            classNameModal={'inset-0'}
            formData = {data}
            accion={accion}
            />
  );
};

export default ModalCrearPatrocinador;
