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
}) => {
  const message =`¿Está seguro que desea eliminar el fixture de la liga: `+liga.nombre+`?`;
  return (
    <ModalEliminarElemento
      nombreElemento={'Fixture'}
      nombreRuta={'calendario.destroyfixture'}
      elemento={caledario}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'fixture'}
      patch={true}
      rol={rol}
    />
  );
};

export default ModalEliminarFixture;
