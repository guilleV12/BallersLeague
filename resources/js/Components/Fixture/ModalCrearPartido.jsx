import React, { useEffect, useState } from 'react'
import { router, useForm } from '@inertiajs/react';
import ModalInformarErrores from '../Modales/ModalInformarErrores';
import ModalEliminarPartido from './ModalEliminarPartido';
import ModalCrearElemento from '../Modales/ModalCrearElemento';

export const ModalCrearPartido = ({ eliminar, jugadoresParticiparon, partido, closeModalCargarResultado, liga, setShowAlert, setTituloAlert, fecha_partido, equipos, equipos_puntajes, jugadores }) => {
    const [isModalErrorPuntosOpen, setIsModalErrorPuntosOpen] = useState(false);
    const [equipoErrorPuntos, setEquipoErrorPuntos] = useState('');
    const [esEmpate, setEsEmpate] = useState(false);
    const openModalErrorPuntos = (equipo, empate) => {
        setEquipoErrorPuntos(equipo);
        if (empate === true){
            setEsEmpate(true);
        } else {
            setEsEmpate(false);
        }
        setIsModalErrorPuntosOpen(true);
    };
    const closeModalErrorPuntos = () => {
        setIsModalErrorPuntosOpen(false);
    };
    const equiposFiltrados = equipos.filter((equipo) => {
        return equipo.id === equipos_puntajes[0] || equipo.id === equipos_puntajes[1];
    });
    const jugadoresEquipo1 = jugadores.filter((jugador) => {
        return jugador.equipo_id === equipos_puntajes[0];
    });
    const jugadoresEquipo2 = jugadores.filter((jugador) => {
        return jugador.equipo_id === equipos_puntajes[1];
    });
    const [selectsEquipo1Seleccionado, setSelectsEquipo1Seleccionados] = useState(Array(12).fill(0));
    const [selectsEquipo2Seleccionado, setSelectsEquipo2Seleccionados] = useState(Array(12).fill(0));
    const handleSelectChange = (index, jugadorSeleccionado) => {
        setSelectsEquipo1Seleccionados((prevSeleccionados) => {
          // Crea una copia del array de selecciones
          const nuevosSeleccionados = [...prevSeleccionados];
          // Asigna el nuevo valor en la posición correcta
          nuevosSeleccionados[index] = jugadorSeleccionado;
          return nuevosSeleccionados;
        });
    };
    const handleSelect2Change = (index, jugadorSeleccionado) => {
        setSelectsEquipo2Seleccionados((prevSeleccionados) => {
          // Crea una copia del array de selecciones
          const nuevosSeleccionados = [...prevSeleccionados];
          // Asigna el nuevo valor en la posición correcta
          nuevosSeleccionados[index] = jugadorSeleccionado;
          return nuevosSeleccionados;
        });
    };  
    const formData = {
        puntaje_equipo_1: partido?partido.puntaje_equipo_1:0,
        puntaje_equipo_2: partido?partido.puntaje_equipo_2:0,
        equipo_1: equipos_puntajes[0],
        equipo_2: equipos_puntajes[1],
        fecha_partido_id: fecha_partido.id,
        calendario_id: fecha_partido.calendario_id,
    };
    const { data, setData, post, reset, setError, errors } = useForm(formData);

    useEffect(() => {
        const initialData = {
        };

        // Crear el objeto de datos para jugadores del equipo 1
        for (let index = 0; index < 12; index++) {
            initialData[`jugador_${index + 1}_equipo_1`] = '';
            initialData[`puntos_equipos_1_jugador_${index + 1}`] = 0;
        }

        // Crear el objeto de datos para jugadores del equipo 2
        for (let index = 0; index < 12; index++) {
            initialData[`jugador_${index + 1}_equipo_2`] = '';
            initialData[`puntos_equipos_2_jugador_${index + 1}`] = 0;
        }
 
        setData({ ...data, ...initialData });
    }, []);
//console.log(data);
    const verificarPuntosPartido = (data) => {
        const equipo1 = data.equipo_1;
        const equipo2 = data.equipo_2;
        const puntosEquipo1 = parseInt(data.puntaje_equipo_1);
        const puntosEquipo2 = parseInt(data.puntaje_equipo_2);
      
        // Calcular el total de puntos de los jugadores del equipo 1
        let totalPuntosEquipo1 = 0;
        for (let i = 1; i <= 12; i++) {
          totalPuntosEquipo1 += parseInt(data[`puntos_equipos_1_jugador_${i}`]);
        }
      
        // Calcular el total de puntos de los jugadores del equipo 2
        let totalPuntosEquipo2 = 0;
        for (let i = 1; i <= 12; i++) {
          totalPuntosEquipo2 += parseInt(data[`puntos_equipos_2_jugador_${i}`]);
        }
      
        // Verificar si los puntos del partido coinciden con los totales de los equipos
        if (eliminar === false) {
            if (totalPuntosEquipo1 !== puntosEquipo1) {
            openModalErrorPuntos(equipo1, false);
            return false;
            } else if (totalPuntosEquipo2 !== puntosEquipo2){
                openModalErrorPuntos(equipo2, false);
                return false;
            } else if (totalPuntosEquipo1 === totalPuntosEquipo2){
                openModalErrorPuntos(equipo1, true);
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    const fechaPartido = new Date(fecha_partido.fecha);
    const hoy = new Date();
  
return (
    <>
        {(fechaPartido >= hoy)?(
                <ModalInformarErrores
                    titulo={'Aun no se ha jugado!'}
                    cuerpo={'La fecha aun no ha llegado, puede editar la fecha si existe algun error en la registrada.'}
                    nombre={'Cerrar'}
                    closeModal={closeModalCargarResultado}
                    left={'left-[53%]'}
                    />
        ):(
            (!fecha_partido.arbitro_1 || !fecha_partido.arbitro_2)?(
                <ModalInformarErrores
                    titulo={'Faltan arbitros!'}
                    cuerpo={'Deben haber dos arbitros por partido, no hay arbitros suficientes.'}
                    nombre={'Cerrar'}
                    closeModal={closeModalCargarResultado}
                    />
        ):(
            (!fecha_partido.horario || !fecha_partido.fecha)?(
                <ModalInformarErrores
                    titulo={'No se definio la fecha ni horario!'}
                    cuerpo={'Deben tener fecha y horario definido.'}
                    nombre={'Cerrar'}
                    closeModal={closeModalCargarResultado}
                    />
        ):(
            (jugadoresEquipo1.length < 5)?(
                <ModalInformarErrores
                    titulo={'Faltan jugadores!'}
                    cuerpo={'El equipo '+equiposFiltrados[0].nombre+' no tiene los 5 jugadores minimos para participar.'}
                    nombre={'Cerrar'}
                    closeModal={closeModalCargarResultado}
                    />
        ):(
                (jugadoresEquipo2.length < 5)&&(
                    <ModalInformarErrores
                        titulo={'Faltan jugadores!'}
                        cuerpo={'El equipo '+equiposFiltrados[1].nombre+' no tiene los 5 jugadores minimos para participar.'}
                        nombre={'Cerrar'}
                        closeModal={closeModalCargarResultado}
                        />
                )
        )
        )
        )
        )}

        {isModalErrorPuntosOpen&&(
            <ModalInformarErrores
                esEmpate={esEmpate}
                errorPuntos={true}
                titulo={'Los puntos no coinciden!'}
                equipos={equipos}
                equipoError={equipoErrorPuntos}
                closeModal={closeModalErrorPuntos}
                nombre={'Entendido'}
                left={'left-[54%]'}
                />    
        )}

        {eliminar === true? (
            <ModalEliminarPartido 
                onDelete={closeModalCargarResultado}
                onCancel={closeModalCargarResultado}
                partido={partido}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}
                formData={data}
                fechas={fecha_partido}
                />
        ):(
            <ModalCrearElemento
                    elementoName="Partido"
                    actionRoute={'partido.store'}
                    onCancel={closeModalCargarResultado}
                    onAdd={closeModalCargarResultado}
                    elemento={partido}
                    setShowAlert={setShowAlert}
                    setTituloAlert={setTituloAlert}
                    liga={liga}
                    fechas={''}
                    setDataPartido={setData}
                    leftPosition={'left-[25%]'}
                    topPosition={'top-[8%]'}
                    classNameForm={'h-full overflow-y-auto'}
                    classNameModal={'inset-0 mb-[1%]'}
                    formData = {data}
                    accion={'agregar'}
                    verificarPuntosPartido={verificarPuntosPartido}
                    eliminar={eliminar}
                    equiposFiltrados={equiposFiltrados}
                    selectsEquipo1Seleccionado={selectsEquipo1Seleccionado}
                    selectsEquipo2Seleccionado={selectsEquipo2Seleccionado}
                    jugadores={jugadores}
                    jugadoresEquipo1={jugadoresEquipo1}
                    jugadoresEquipo2={jugadoresEquipo2}
                    handleSelect2Change={handleSelect2Change}
                    handleSelectChange={handleSelectChange}
                    />
        )}
                
    </>
  )
}
export default ModalCrearPartido;