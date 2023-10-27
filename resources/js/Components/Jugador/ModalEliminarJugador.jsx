import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarJugador = ({
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
  jugador
}) => {
  const message =`¿Está seguro que desea eliminar al jugador: `+jugador.nombre+` `+jugador.apellido+`?`;
  return (
    <ModalEliminarElemento
      nombreElemento={'Jugador'}
      nombreRuta={'jugadores.destroy'}
      elemento={jugador}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={''}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'jugador'}
    />
  );
};

export default ModalEliminarJugador;
