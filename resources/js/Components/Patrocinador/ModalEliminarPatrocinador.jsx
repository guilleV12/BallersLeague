import React from 'react';
import ModalEliminarElemento from '../Modales/ModalEliminarElemento';

const ModalEliminarPatrocinador = ({
  patrocinador,
  onDelete,
  onCancel,
  className,
  setShowAlert,
  setTituloAlert,
}) => {
  const message =`¿Está seguro que desea eliminar al patrocinador: ${patrocinador.nombre}.`;
  return (
    <ModalEliminarElemento
      nombreElemento={patrocinador.nombre}
      nombreRuta={'patrocinadores.destroy'}
      elemento={patrocinador}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      leftPosition={'left-[35%]'}
      message={message}
      tipoElemento={'patrocinador'}
    />
  );
};

export default ModalEliminarPatrocinador;
