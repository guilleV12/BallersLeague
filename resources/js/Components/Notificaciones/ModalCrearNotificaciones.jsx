import React from 'react'
import ModalCrearElemento from '../Modales/ModalCrearElemento';

export const ModalCrearNotificaciones = ({
user,
liga,
actionRoute,
onCancel,
onAdd,
setShowAlert,
setTituloAlert,
accion,
notificacionesUsuario
}) => {
  
  const formData = {
    notificacion_partido: notificacionesUsuario ? (notificacionesUsuario.notificacion_partido === 0 ? false : true) : false,
    notificacion_resultado: notificacionesUsuario ? (notificacionesUsuario.notificacion_resultado === 0 ? false : true) : false,
    liga_id:liga.id,
    user_id: user.id,
};

return (
<>
    <ModalCrearElemento
        elementoName="Notificaciones"
        actionRoute={notificacionesUsuario ? 'notificaciones.update' : actionRoute}
        onCancel={onCancel}
        onAdd={onAdd}
        setShowAlert={setShowAlert}
        setTituloAlert={setTituloAlert}
        liga={liga}
        leftPosition={'left-[0%] md:left-[33%]'}
        topPosition={'top-[20%]'}
        classNameForm={'h-full overflow-y-auto'}
        classNameModal={'inset-0 mb-[1%]'}
        formData = {formData}
        user={user}
        elemento={notificacionesUsuario ? notificacionesUsuario : null}
        accion={notificacionesUsuario ? 'editar' : 'agregar'}
        />
</>
  )
}
export default ModalCrearNotificaciones;