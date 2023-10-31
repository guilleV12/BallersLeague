import React, { useEffect, useState } from 'react';
import ModalCrearElemento from '../Modales/ModalCrearElemento';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

const ModalCrearEquipo = ({ liga, onCancel, onAdd, setShowAlert, setTituloAlert, accion, equipo, fechasPartido, actionRoute, partidos }) => {
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
            titulo={partidos && partidos.length > 0 ? 'No puede agregar nuevos equipos' : 'Se eliminara el fixture!'}
            cuerpo={partidos && partidos.length > 0 ? 'La liga ya comenzo, no puede agregar equipos hasta que termine.' : 'Si agrega un equipo ahora se eliminara el fixture actual.'}
            nombre={'Cerrar'}
            closeModal={() => {partidos && partidos.length > 0 ? onCancel() : closeModalEliminarFixture();}}
            left={'left-[50%]'}
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
            leftPosition={'left-[35%]'}
            formData = {formDataEquipo}
            accion={accion}
            />
    )
  );
};

export default ModalCrearEquipo;
