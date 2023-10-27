import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarPartido = ({
  partido,
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  fechas,
  formData,
}) => {
  const message = `¿Está seguro que desea eliminar el partido?`;
  return (
    <ModalEliminarElemento
      nombreElemento={'Partido'}
      nombreRuta={'partido.destroy'}
      elemento={partido}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={'left-[45%]'}
      message={message}
      formData={formData}
      tipoElemento={'partido'}
    />
  );
};

export default ModalEliminarPartido;
