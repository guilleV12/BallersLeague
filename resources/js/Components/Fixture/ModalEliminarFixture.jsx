import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarFixture = ({
  caledario,
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  fechas,
  liga,
  rol,
  variante,
  esPlayoff,
}) => {
  
  const message =esPlayoff ? `¿Está seguro que desea eliminar los playoffs de la liga: `+liga.nombre+`?` : `¿Está seguro que desea eliminar el fixture de la liga: `+liga.nombre+`?`;
  return (
    <ModalEliminarElemento
      nombreElemento={esPlayoff? 'Playoffs' : 'Fixture'}
      nombreRuta={esPlayoff ? 'playoffs.destroyPlayoffsFechas' : 'calendario.destroyfixture'}
      elemento={caledario}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'playoffs'}
      patch={true}
      rol={rol}
    />
  );
};

export default ModalEliminarFixture;
