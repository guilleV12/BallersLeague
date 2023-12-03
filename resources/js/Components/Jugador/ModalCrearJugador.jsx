import React from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento'

const ModalCrearJugador = ({ jugador, liga, equipo, onCancel, onAdd, onEdit, accion, setShowAlert, setTituloAlert, actionRoute }) => {

    const formData = {
        nombre: (accion === 'agregar' ? '' : jugador.nombre),
        apellido: (accion === 'agregar' ? '' : jugador.apellido),
        dni: (accion === 'agregar' ? '' : jugador.dni),
        fecha_nacimiento: (accion === 'agregar' ? '' : jugador.fecha_nacimiento),
        foto_perfil: undefined,
        equipo_id:equipo.id,
        liga_id:equipo.liga_id,
    };
    
  return (
    <>
        <ModalCrearElemento
            elementoName="Jugador"
            actionRoute={actionRoute}
            onCancel={onCancel}
            onAdd={onAdd}
            elemento={jugador}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            liga={liga}
            leftPosition={'left-[33%]'}
            topPosition={'top-[5%]'}
            classNameForm={'h-full overflow-y-auto'}
            formData = {formData}
            accion={accion}
            />
    </>
  )
}

export default ModalCrearJugador;