import React from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento';

export const ModalFinalizarLiga = ({
    liga,
    onCancel,
    onAdd, 
    setShowAlert, 
    setTituloAlert
}) => {

    const data = {
        id_liga:liga.id,
    };
    
  return (
    <ModalCrearElemento
      elementoName="Campeon"
      actionRoute="campeon.store"
      onCancel={onCancel}
      onAdd={onAdd}
      setShowAlert={setShowAlert}
      setTituloAlert={setTituloAlert}
      liga={liga}
      leftPosition={'left-[37%]'}
      topPosition={'top-[20%]'}
      formData = {data}
      accion={'agregar'}
    />
  )
}
export default ModalFinalizarLiga;