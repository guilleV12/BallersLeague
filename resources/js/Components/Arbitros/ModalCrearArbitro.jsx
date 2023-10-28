import React from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';

const ModalCrearArbitro = ({ liga, onCancel, onAdd, setShowAlert, setTituloAlert }) => {
    const formDataArbitro = {
        email: '',
        id_liga:liga.id,
    };

  return (
    <ModalCrearElemento
      elementoName="Arbitro"
      actionRoute="arbitros.store"
      onCancel={onCancel}
      onAdd={onAdd}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      liga={liga}
      leftPosition={'left-[40%]'}
      formData = {formDataArbitro}
      accion={'agregar'}
    />
  );
};

export default ModalCrearArbitro;
