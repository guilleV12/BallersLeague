import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

const ModalCrearVoto = ({ liga, user, onCancel, onAdd, setShowAlert, setTituloAlert, accion, jugadores, actionRoute, equipos }) => {
    const formData = {
        user_id:user.id,
        liga_id:liga.id,
        jugador_id: '',
    };

    const [isAdvertenciaLeida, setAdvertenciaLeida] = useState(false);

  return (
    isAdvertenciaLeida ? (
        <ModalCrearElemento
            elementoName="Voto"
            actionRoute={actionRoute}
            onCancel={onCancel}
            onAdd={onAdd}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            liga={liga}
            formData = {formData}
            jugadores={jugadores}
            equipos={equipos}
            accion={accion}
            topPosition={'top-[5%]'}
            leftPosition={'left-[30%]'}
            width={'w-[40%]'}
            />
    ):(
        <ModalInformarErrores
            titulo={'No podra cambiar su voto!'}
            cuerpo={'Solo podra votar una vez y no podra cambiarlo.'}
            nombre={'Entendido'}
            closeModal={() => {setAdvertenciaLeida(true);}}
            />
    )
        
  );
};

export default ModalCrearVoto;
