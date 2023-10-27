import React, { useState } from 'react'
import Dropdown from '../Dropdown';
import ModalEditarFecha from './ModalEditarFecha';
import ModalCrearPartido from './ModalCrearPartido';
import ModalVerEstadisticas from './ModalVerEstadisticas';
import { BotonContenido, BotonEditar, BotonOpciones } from '../BotonesAcciones';

export const TablaFixture = ({ jugadorPartido, partidos, liga, fechas, equipos, arbitros, users, user, setShowAlert, setTituloAlert, jugadores }) => {
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

  return (
    <div>

        <table className="text-black dark:text-gray-400 w-full">
            <thead className="text-base text-left font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr className='grid grid-cols-3 md:grid-cols-7'>
                    <th scope="col" className="px-4 py-1 hidden md:flex items-center justify-start">
                        Fecha
                    </th>
                    <th scope="col" className="px-4 py-1 hidden md:flex items-center justify-start">
                        Horario
                    </th>
                    <th scope="col" className="px-4 py-1 flex items-center justify-start">
                        Equipo local
                    </th>
                    <th scope="col" className="px-4 py-1 flex items-center justify-start">
                        Equipo visitante
                    </th>
                    <th scope='col' className='px-4 py-1 hidden md:flex items-center justify-start'>
                        Arbitros
                    </th>
                    <th scope='col' className='px-4 py-1 hidden md:flex items-center justify-start'>
                        Ganador
                    </th>
                    <th scope="col" className='px-4 py-1 flex items-center justify-end'>
                        Accion
                    </th>
                </tr>
            </thead>
            <tbody>
                {fechas &&(fechas.map((fecha, index) => (
                    <tr key={index} className='grid grid-cols-3 md:grid-cols-7 py-2 border-b text-sm'>
                        <td scope="col" className="px-6 py-1 hidden md:flex items-center justify-start">
                            {fecha.fecha ? fecha.fecha : 'No definida'}
                        </td>
                        <td scope="col" className="px-6 py-1 hidden md:flex items-center justify-start">
                            {fecha.horario ? fecha.horario : 'No definido'}
                        </td>
                        <td scope="col" className="px-6 py-1 flex items-center justify-start">
                            <div className='hidden md:flex items-center justify-start'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_1 ? equipo.nombre : ''
                                )))}
                            </div>
                            <div className='flex md:hidden items-center justify-start'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_1 ? <img key={equipo.id} src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto md:w-32 rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img> : ''
                                )))}
                            </div>
                        </td>
                        <td scope="col" className="px-6 py-1 flex items-center justify-start">
                            <div className='hidden md:flex items-center justify-start'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_2 ? equipo.nombre : ''
                                )))}
                            </div>
                            <div className='flex md:hidden items-center justify-start'>
                                {equipos &&(equipos.map((equipo)=>(
                                    equipo.id === fecha.equipo_2 ? <img key={equipo.id} src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto md:w-32 rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img> : ''
                                )))}
                            </div>
                        </td>
                        <td scope='col' className='px-6 py-1 text-sm hidden md:flex items-center justify-start'>
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
                        <td scope="col" className="px-6 py-1 hidden md:flex items-center justify-start">
                        {
                            partidos &&(partidos.map((partido, index) => (
                                (partido.fecha_partido_id === fecha.id) ? (
                                    (partido.puntaje_equipo_1 > partido.puntaje_equipo_2) ? (
                                        equipos.map((equipo) => (equipo.id === fecha.equipo_1) &&(
                                            <div key={index}>
                                                <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='h-10 w-auto' alt={equipo.nombre} />
                                                {equipo.nombre}
                                            </div>
                                        ))
                                    ) : (
                                        equipos.map((equipo) => (equipo.id === fecha.equipo_2) &&(
                                            <div key={index}>
                                                <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='h-10 w-auto' alt={equipo.nombre} />
                                                {equipo.nombre}
                                            </div>
                                        ))
                                    )
                                ):('')
                            )))
                        }
                       
                        </td>
                        <td scope="col" className='px-6 py-1 flex items-center justify-end'>
                            {liga.user_id === user.id &&(
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
                                </Dropdown>  
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
                />
        )}
        { isModalCargarResultadoOpen &&( 
            <ModalCrearPartido 
                eliminar={eliminar} 
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
                setShowAlert={setShowAlert} 
                setTituloAlert={setTituloAlert} 
                closeModalVerEstadisticas={closeModalVerEstadisticas}
                />
        )}
    </div>
  )
}
export default TablaFixture;