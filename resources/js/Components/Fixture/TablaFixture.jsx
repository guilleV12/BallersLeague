import React, { useState } from 'react'
import Dropdown from '../Dropdown';
import ModalEditarFecha from './ModalEditarFecha';
import ModalCrearPartido from './ModalCrearPartido';
import ModalVerEstadisticas from './ModalVerEstadisticas';
import { BotonContenido, BotonEditar, BotonOpciones } from '../BotonesAcciones';

export const TablaFixture = ({ patrocinadorConPrioridad, jugadorPartido, partidos, liga, fechas, equipos, arbitros, users, user, setShowAlert, setTituloAlert, jugadores, rol }) => {
const [isModalEditarFechaOpen, setModalEditarFechaOpen] = useState(false);
const [fechaEditar, setFechaEditar] = useState(false);
const [isModalCargarResultadoOpen, setModalCargarResultadoOpen] = useState(false);
const [equiposResultados, setEquiposResultados] = useState([]);
const [partidoJugado, setPartidoJugado] = useState('');
const [jugadoresPartidoCargar, setJugadoresPartidoCargar] = useState('');
const [eliminar, setEliminar] = useState(false);
const [isModalVerEstadisticasOpen, setModalVerEstadisticasOpen] = useState(false);
const [fechaPartidoVer, setFechaPartidoVer] = useState('');

const openModalVerEstadisticas = (fecha) => {
    setFechaPartidoVer(fecha);
    setModalVerEstadisticasOpen(true);
};
const openModalEditarFecha = (fecha) => {
    setFechaEditar(fecha);
    setModalEditarFechaOpen(true);
};
const closeModalVerEstadisticas = () => {
    setModalVerEstadisticasOpen(false);
}
const closeModalEditarFecha = () => {
    setModalEditarFechaOpen(false);
};
const buscarPartido = (fecha) => {
    if (partidos.find(partido => partido.fecha_partido_id === fecha.id)) {
        // Si fecha_partido existe en partidos, carga los datos del partido
        const partidoEncontrado = partidos.find(partido => partido.fecha_partido_id === fecha.id);
        setPartidoJugado(partidoEncontrado);
        if (jugadorPartido){
            setJugadoresPartidoCargar(jugadorPartido.filter((jugador)=>jugador.partido_id === partidoEncontrado.id));
            setEliminar(true);
        }else{
            setJugadoresPartidoCargar('');
            setEliminar(false);
        }
    }else{
        setPartidoJugado('');
        setJugadoresPartidoCargar('');
        setEliminar(false);
    }
};
const openModalCargarResultado = (fecha, equipo_1, equipo_2) => {
    setFechaEditar(fecha);
    buscarPartido(fecha);
    setEquiposResultados([equipo_1, equipo_2]);
    setModalCargarResultadoOpen(true);
};
const closeModalCargarResultado = () => {
    setModalCargarResultadoOpen(false);
};

const formatFecha = (fecha) => {
    const date = new Date(fecha);

    // Obtener la diferencia horaria en minutos
    const timezoneOffset = date.getTimezoneOffset();

    // Ajustar la fecha sumando la diferencia horaria
    date.setMinutes(date.getMinutes() + timezoneOffset);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
};

  return (
    <div>

        <table className="text-black dark:text-gray-400 w-full">
            <thead className="text-base text-left font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr className={`grid grid-cols-3 md:grid-cols-7`}>
                    <th scope="col" className="hidden md:flex justify-center">
                        Fecha
                    </th>
                    <th scope="col" className="hidden md:flex justify-center">
                        Horario
                    </th>
                    <th scope="col" className="flex justify-center">
                        Equipo local
                    </th>
                    <th scope="col" className="flex justify-center">
                        Equipo visitante
                    </th>
                    <th scope='col' className='hidden md:flex justify-center'>
                        Arbitros
                    </th>
                    <th scope='col' className='hidden md:flex justify-center'>
                        Ganador
                    </th>
                    <th scope="col" className='flex justify-center'>
                        {((user && user.id === liga.user_id) || rol === 'admin') ?( 'Accion'):('Estadisticas')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {fechas &&(fechas.map((fecha, index) => (
                    <tr key={index} className={`grid grid-cols-3 md:grid-cols-7 py-2 border-b text-sm`}>
                        <td scope="col" className="hidden md:flex items-center justify-center">
                            {fecha.fecha ? formatFecha(fecha.fecha) : 'No definida'}
                        </td>
                        <td scope="col" className="hidden md:flex items-center justify-center">
                            {fecha.horario ? fecha.horario : 'No definido'}
                        </td>
                        <td scope="col" className="flex-col items-center justify-center">
                            <div className='flex w-full justify-center'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_1 ? <img key={equipo.id} src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img> : ''
                                )))}
                            </div>
                            <div className='hidden md:flex w-full justify-center'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_1 ? equipo.nombre : ''
                                )))}
                            </div>
                        </td>
                        <td scope="col" className="flex-col items-center justify-center">
                            <div className='flex w-full justify-center'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_2 ? <img key={equipo.id} src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img> : ''
                                )))}
                            </div>
                            <div className='hidden md:flex w-full justify-center'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_2 ? equipo.nombre : ''
                                )))}
                            </div>
                        </td>
                        <td scope='col' className='hidden md:flex items-center justify-center'>
                            {arbitros &&(arbitros.map((arbitro)=>(
                                arbitro.id === fecha.arbitro_1 ? (
                                    users.map((user) => (
                                        arbitro.id_user === user.id ? (user.nombre+' '+user.apellido) : ''
                                    ))
                                ) : ''
                            )))}
                            <br/>
                            {arbitros &&(arbitros.map((arbitro)=>(
                                arbitro.id === fecha.arbitro_2 ? (
                                    users.map((user) => (
                                        arbitro.id_user === user.id ? (user.nombre+' '+user.apellido) : ''
                                    ))
                                ) : ''
                            )))}
                        </td>
                        <td scope="col" className="hidden md:flex items-center justify-center">
                        {
                            partidos &&(partidos.map((partido, index) => (
                                (partido.fecha_partido_id === fecha.id) ? (
                                    (partido.puntaje_equipo_1 > partido.puntaje_equipo_2) ? (
                                        equipos.map((equipo) => (equipo.id === fecha.equipo_1) &&(
                                            <div key={index}>
                                                <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='h-24 w-auto' alt={`equipo ganador: ${equipo.nombre}`} title={`equipo ganador: ${equipo.nombre}`}/>
                                            </div>
                                        ))
                                    ) : (
                                        equipos.map((equipo) => (equipo.id === fecha.equipo_2) &&(
                                            <div key={index}>
                                                <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='h-24 w-auto' alt={`equipo ganador: ${equipo.nombre}`} title={`equipo ganador: ${equipo.nombre}`}/>
                                            </div>
                                        ))
                                    )
                                ):('')
                            )))
                        }
                       
                        </td>
                        <td scope="col" className='flex items-center justify-center'>
                        {((user && liga.user_id === user.id) || rol==='admin') ?(
                                <Dropdown>
                                    <Dropdown.Trigger>
                                            <BotonOpciones/>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <ul className='p-1'>
                                            <li>
                                                <BotonEditar
                                                    onClick={() => {openModalEditarFecha(fecha)}}
                                                    className={' block w-full justify-center'}
                                                    />
                                            </li>
                                            <li>
                                                <BotonContenido
                                                    onClick={() => {openModalCargarResultado(fecha, fecha.equipo_1, fecha.equipo_2)}}
                                                    className={' block w-full justify-center mt-1'}
                                                    nombre={partidos.length > 0 ? (
                                                        partidos.find((partido) => partido.fecha_partido_id === fecha.id) ? (
                                                            'Eliminar resultado'
                                                        ):('Cargar resultado')
                                                    ):(
                                                        'Cargar resultado'
                                                    )}
                                                    />                                               
                                            </li>
                                                {partidos.length > 0 ? (
                                                    partidos.find((partido) => partido.fecha_partido_id === fecha.id) ? (
                                                    <li>
                                                        <BotonContenido
                                                            onClick={() => {openModalVerEstadisticas(fecha)}}
                                                            className={' block w-full justify-center mt-1'}
                                                            nombre={'Estadisticas'}
                                                            />
                                                        </li>
                                                        ):('')
                                                    ):(
                                                        ''
                                                )}
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown> ):(
                                    <BotonContenido
                                        onClick={() => {openModalVerEstadisticas(fecha)}}
                                        className={' block justify-center mt-1'}
                                        nombre={'Estadisticas'}
                                        />
                                )}
                        </td>
                    </tr>
                    )))}
            </tbody>
        </table>
        { isModalEditarFechaOpen &&( 
            <ModalEditarFecha 
                liga={liga} 
                closeModalEditarFecha={closeModalEditarFecha} 
                fechaEditar={fechaEditar} 
                arbitros={arbitros} 
                users={users} 
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert}
                patch={true}
                rol={rol}
                partidos={partidos}
                />
        )}
        { isModalCargarResultadoOpen &&( 
            <ModalCrearPartido 
                eliminar={eliminar} 
                rol={rol}
                partidos={partidos}
                jugadoresParticiparon={jugadoresPartidoCargar} 
                partido={partidoJugado} 
                jugadores={jugadores} 
                equipos={equipos} 
                equipos_puntajes={equiposResultados} 
                liga={liga} 
                fecha_partido={fechaEditar} 
                closeModalCargarResultado={closeModalCargarResultado} 
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert}
                />
        )}
        { isModalVerEstadisticasOpen &&( 
            <ModalVerEstadisticas 
                users={users} 
                arbitros={arbitros} 
                jugadorPartido={jugadorPartido} 
                jugadores={jugadores} 
                equipos={equipos} 
                partidos={partidos} 
                fechaPartidoVer={fechaPartidoVer} 
                patrocinadorConPrioridad={patrocinadorConPrioridad}
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert} 
                closeModalVerEstadisticas={closeModalVerEstadisticas}
                />
        )}
    </div>
  )
}
export default TablaFixture;