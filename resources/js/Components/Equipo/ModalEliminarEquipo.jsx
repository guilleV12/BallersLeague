import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarEquipo = ({
  equipo,
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  fechas,
}) => {
  const message = `¿Está seguro que desea eliminar el equipo: ${equipo.nombre}? Sus jugadores, el fixture, partidos jugados y tablas también serán eliminados.`;
  return (
    <ModalEliminarElemento
      nombreElemento={equipo.nombre}
      nombreRuta={'equipos.destroy'}
      elemento={equipo}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={'left-[23%]'}
      message={message}
      tipoElemento={'equipo'}
    />
  );
};

export default ModalEliminarEquipo;
