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
  partidos
}) => {
  const message = partidos && partidos.length>0? 'La liga ya comenzo, no puede eliminar equipos hasta que termine.' :
   `¿Está seguro que desea eliminar el equipo: ${equipo.nombre}? Sus jugadores y el fixture también serán eliminados.`;
  return (
    <ModalEliminarElemento
      nombreElemento={equipo.nombre}
      nombreRuta={'equipos.destroy'}
      elemento={equipo}
      onDelete={onDelete}
      onCancel={onCancel}
      partidos={partidos}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={partidos && partidos.length>0? 'left-[35%]' : 'left-[25%]'}
      message={message}
      tipoElemento={'equipo'}
    />
  );
};

export default ModalEliminarEquipo;
