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
}) => {console.log(notificacionesUsuario);
  const formData = {
    notificacion_partido: notificacionesUsuario.notificacion_partido === 0 ? false : true,
    notificacion_resultado: notificacionesUsuario.notificacion_resultado === 0 ? false : true,
    liga_id:liga.id,
    user_id: user.id,
};

return (
<>
    <ModalCrearElemento
        elementoName="Notificaciones"
        actionRoute={actionRoute}
        onCancel={onCancel}
        onAdd={onAdd}
        setShowAlert={setShowAlert}
        setTituloAlert={setTituloAlert}
        liga={liga}
        leftPosition={'left-[40%]'}
        topPosition={'top-[20%]'}
        classNameForm={'h-full overflow-y-auto'}
        classNameModal={'inset-0 mb-[1%]'}
        formData = {formData}
        user={user}
        accion={accion}
        />
</>
  )
}
export default ModalCrearNotificaciones;