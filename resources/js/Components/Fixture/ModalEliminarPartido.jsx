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
  esPlayoff,
  formData,
  rol
}) => {
  const message = rol==='admin'?`¿Está seguro que desea eliminar el partido?`:'Debe comunicarse con el administrador para eliminar este resultado.';
  return (
    <ModalEliminarElemento
      nombreElemento={'Partido'}
      nombreRuta={esPlayoff ? 'partidoplayoffs.destroy' : 'partido.destroy'}
      elemento={partido}
      onDelete={onDelete}
      onCancel={onCancel}
      className={className}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      fechas={fechas}
      leftPosition={rol&&rol==='admin'?'left-[40%]':'left-[32%]'}
      message={message}
      formData={formData}
      tipoElemento={'partido'}
      rol={rol}
    />
  );
};

export default ModalEliminarPartido;
