import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarVotacion = ({
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  voto
}) => {
  const message =`¿Está seguro que desea eliminar la votacion de jugador mas valioso?`;
  return (
    <ModalEliminarElemento
      nombreElemento={'Votacion'}
      nombreRuta={'jmv.destroy'}
      elemento={voto}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={''}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'voto'}
    />
  );
};

export default ModalEliminarVotacion;
