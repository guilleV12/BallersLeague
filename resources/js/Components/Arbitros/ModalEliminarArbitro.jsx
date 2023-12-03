import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarArbitro = ({
  arbitro,
  user,
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  fechas,
}) => {
  const message = `¿Está seguro que desea eliminar al árbitro ${user.nombre} ${user.apellido}?`;
  return (
    <ModalEliminarElemento
      nombreElemento={user.nombre+' '+user.apellido}
      nombreRuta={'arbitros.destroy'}
      elemento={arbitro}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'arbitro'}
    />
  );
};

export default ModalEliminarArbitro;
