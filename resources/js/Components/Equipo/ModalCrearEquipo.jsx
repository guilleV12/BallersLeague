import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

const ModalCrearEquipo = ({ liga, onCancel, onAdd, setShowAlert, setTituloAlert, accion, equipo, fechasPartido, actionRoute }) => {
    const formDataEquipo = {
        nombre: (accion === 'agregar' ? '' : equipo.nombre),
        descripcion: (accion === 'agregar' ? '' : equipo.descripcion),
        logo: undefined,
        liga_id:liga.id,
        destruirEstructuraActual: (fechasPartido&&(fechasPartido.length > 0 ? true : false)),
    };

    const [isEliminarFechasPartidoOpen, setEliminarFechasPartidoOpen] = useState(false);
    const [isAdvertenciaLeida, setAdvertenciaLeida] = useState(false);

    useEffect(() => {
        if (fechasPartido){
            if (fechasPartido.length > 0 && isAdvertenciaLeida === false){
                setEliminarFechasPartidoOpen(true);
                setAdvertenciaLeida(true);
            }
        }
    }, [fechasPartido]);

    const closeModalEliminarFixture = () =>{
        setEliminarFechasPartidoOpen(false);
        setAdvertenciaLeida(true);
    };

  return (
    isEliminarFechasPartidoOpen ?(
        <ModalInformarErrores
            titulo={'Se eliminara el fixture!'}
            cuerpo={'Si agrega un equipo ahora se eliminara el fixture actual.'}
            nombre={'Cerrar'}
            closeModal={() => {closeModalEliminarFixture();}}
            left={'left-[57%]'}
            />
    ):(
        <ModalCrearElemento
            elementoName="Equipo"
            actionRoute={actionRoute}
            onCancel={onCancel}
            onAdd={onAdd}
            elemento={equipo}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            liga={liga}
            leftPosition={'left-[40%]'}
            formData = {formDataEquipo}
            accion={accion}
            />
    )
  );
};

export default ModalCrearEquipo;
