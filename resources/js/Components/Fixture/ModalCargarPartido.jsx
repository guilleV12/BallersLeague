import React, { useEffect, useState } from 'react'
import TextInput from '../TextInput';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import vsLogo from '../Images/vs.png';
import ModalError from '../Modales/ModalError';
import ModalErrorPuntos from '../Modales/ModalErrorPuntos';
import ModalEliminarPartido from '../Modales/ModalEliminarPartido';

export const ModalCargarPartido = ({ eliminar, jugadoresParticiparon, partido, closeModalCargarResultado, liga, setShowAlert, setTituloAlert, fecha_partido, equipos, equipos_puntajes, jugadores }) => {
    const [isModalErrorPuntosOpen, setIsModalErrorPuntosOpen] = useState(false);
    const [equipoErrorPuntos, setEquipoErrorPuntos] = useState('');
    const [esEmpate, setEsEmpate] = useState(false);
    const openModalErrorPuntos = (equipo, empate) => {
        setEquipoErrorPuntos(equipo);
        if (empate === true){
            setEsEmpate(true);
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
    const { data, setData, post, processing, reset, errors, setError } = useForm({
        puntaje_equipo_1: partido?partido.puntaje_equipo_1:'',
        puntaje_equipo_2: partido?partido.puntaje_equipo_2:'',
        equipo_1: equipos_puntajes[0],
        equipo_2: equipos_puntajes[1],
        fecha_partido_id: fecha_partido.id,
        calendario_id: fecha_partido.calendario_id,
    });
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
    const submit = (e) => {
        e.preventDefault();
        if (verificarPuntosPartido(data)){
            if (eliminar === false){
                post(route('partido.store'), 
                {onSuccess: ()=> {
                    setShowAlert(true);
                    closeModalCargarResultado();
                    setTituloAlert('Resultado cargado con exito!');
                    reset();
                }})
            }else{
                router.post(route('partido.destroy', partido.id), {
                    ...data,
                    _method: 'delete',
                }, {
                    onSuccess: () => {
                        reset();
                        closeModalCargarResultado();
                        setShowAlert(true);
                        setTituloAlert('Resultado eliminado con exito!');
                    },
                    onError: (response) => {
                        setError({ ...errors, ...response });
                    },
                });
            }
        }
    };
    const fechaPartido = new Date(fecha_partido.fecha);
    const hoy = new Date();
    
return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>
    <div id="delete-confirmation-modal" className={`fixed inset-0 flex items-center justify-center z-50 mt-[5%] mb-[1%]`}>
        <div className=" w-full max-w-3xl max-h-full rounded-l-lg overflow-y-auto">
            {fechaPartido <= hoy ? (
                fecha_partido.arbitro_1 && fecha_partido.arbitro_2 ? (
                    fecha_partido.horario && fecha_partido.fecha ? (
                        jugadoresEquipo1.length >= 5 ? (
                            jugadoresEquipo2.length >= 5 ? (
                                <form onSubmit={submit} className={` border ${eliminar === true ? (`px-0 rounded-lg border-black bg-white`):(`px-0 rounded-l-lg border-gray-100 bg-gray-100`)} pb-5 shadow-xl`} encType='multipart/form-data'>
                                {eliminar === true ? (
                                    <ModalEliminarPartido />
                                ):(<>
                                <div className='w-full flex bg-orange-500 justify-center items-center py-5 text-3xl font-bold text-white'>
                                    Cargar resultado
                                </div>
                                    <div className='w-full flex justify-center items-center mb-2'>
                                    <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo de equipo ${liga.logo}`} title={`logo de equipo ${liga.logo}`} className="h-52 w-auto rounded-full" />
                                    </div>
                                    
                                    <div className='border border-black rounded-lg mx-3 p-3 bg-white'>
                                        <div className='w-full flex justify-center items-center mb-4 text-2xl font-extrabold'>
                                            Resultado
                                        </div>
                                        <div className='w-full flex justify-between items-center mb-2 text-lg font-semibold'>
                                            <div>
                                                {equiposFiltrados[0].nombre}
                                            </div>
                                            <div>
                                                {equiposFiltrados[1].nombre}
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center space-x-5'>
                                            <img src={`/images/${equiposFiltrados[0].logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" />
                                            <TextInput id="puntaje_equipo_1" type="number" name="puntaje_equipo_1" value={data.puntaje_equipo_1} placeholder={'Puntos'} onChange={e => setData('puntaje_equipo_1', parseInt(e.target.value))} autoComplete='puntaje_equipo_1' isFocused={true} className='mt-1 block w-full'/>
                                            <InputError message={errors.puntaje_equipo_1} className='mt-2'/>
                            
                                            <img src={vsLogo} className="h-20 w-auto rounded-full" />

                                            <InputLabel htmlFor='puntaje_equipo_2' value={''}/>
                                            <TextInput id="puntaje_equipo_2" type="number" name="puntaje_equipo_2" value={data.puntaje_equipo_2} placeholder={'Puntos'} onChange={e => setData('puntaje_equipo_2', parseInt(e.target.value))} autoComplete='puntaje_equipo_2' className='mt-1 block w-full'/>
                                            <InputError message={errors.puntaje_equipo_2} className='mt-2'/>
                                            <img src={`/images/${equiposFiltrados[1].logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" />
                                        </div>
                                    </div>

                                    <div className='border border-black rounded-lg mx-3 p-3 bg-white mt-3'>
                                        <div className='w-full flex justify-center items-center mt-6 mb-4 text-2xl font-extrabold'>
                                            Puntos individuales
                                        </div>

                                        <div className="grid grid-cols-2 mt-4 space-x-3">
                                            <div className='flex flex-col'>
                                            {Array.from({ length: 12 }, (_, index) => (
                                                <div key={`jugador_${index+1}_equipo_1`}>
                                                <div className="flex items-center mt-2 space-x-1">
                                                    <img
                                                        src={data[`jugador_${index+1}_equipo_1`] ? (`/images/${jugadores.find(jugador => jugador.id === data[`jugador_${index+1}_equipo_1`]).foto_perfil}?${new Date().getTime()}`) : ''}
                                                        className="h-20 w-auto rounded-full"
                                                    />
                                                    <select
                                                        name={`jugador_${index+1}_equipo_1`}
                                                        value={data[`jugador_${index+1}_equipo_1`]}
                                                        onChange={(e) => {
                                                            const jugadorSeleccionado = parseInt(e.target.value);
                                                            handleSelectChange(index, jugadorSeleccionado);
                                                            setData(`jugador_${index + 1}_equipo_1`, jugadorSeleccionado);
                                                        }}
                                                        className="mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
                                                    >
                                                        <option value='0'>Selecciona un jugador</option>
                                                        {jugadoresEquipo1
                                                            .filter((jugador) => jugador.id === data[`jugador_${index+1}_equipo_1`] || !selectsEquipo1Seleccionado.includes(jugador.id))
                                                            .map((jugador) => (
                                                                <option key={jugador.id} value={jugador.id}>
                                                                    {`${jugador.nombre} ${jugador.apellido}`}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>

                                                    <TextInput
                                                        type="number"
                                                        name={`puntos_equipos_1_jugador_${index + 1}`}
                                                        value={data[`puntos_equipos_1_jugador_${index + 1}`]}
                                                        onChange={(e) => {
                                                            const puntos = parseInt(e.target.value);
                                                            setData(`puntos_equipos_1_jugador_${index + 1}`, puntos);
                                                        }}
                                                        disabled={!data[`jugador_${index+1}_equipo_1`] || ''}
                                                        className={`mt-1 block w-20 ${!data[`jugador_${index+1}_equipo_1`] || ''?('hidden'):('')}`}
                                                    />
                                                </div>
                                                <InputError message={errors[`jugador_${index+1}_equipo_1`]} className='mt-2 block w-full'/>
                                                </div>
                                            ))}


                                            </div>

                                            <div className='flex flex-col justify-end'>
                                            {Array.from({ length: 12 }, (_, index) => (
                                                <div key={`jugador_${index+1}_equipo_2`}>
                                                <div className="flex items-center mt-2">   
                                                    <TextInput
                                                        type="number"
                                                        name={`puntos_equipos_2_jugador_${index + 1}`}
                                                        value={data[`puntos_equipos_2_jugador_${index + 1}`]}
                                                        onChange={(e) => {
                                                            const puntos = parseInt(e.target.value);
                                                            setData(`puntos_equipos_2_jugador_${index + 1}`, puntos);
                                                        }}
                                                        disabled={!data[`jugador_${index+1}_equipo_2`] || ''}
                                                        className={`mt-1 block w-20 ${!data[`jugador_${index+1}_equipo_2`] || ''?('hidden'):('')}`}
                                                    />  
                                                    <select
                                                        name={`jugador_${index+1}_equipo_2`}
                                                        value={data[`jugador_${index+1}_equipo_2`]}
                                                        onChange={(e) => {
                                                            const jugadorSeleccionado = parseInt(e.target.value);
                                                            handleSelect2Change(index, jugadorSeleccionado);
                                                            setData(`jugador_${index + 1}_equipo_2`, jugadorSeleccionado);
                                                        }}
                                                        className="mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
                                                    >
                                                        <option value='0'>Selecciona un jugador</option>
                                                        {jugadoresEquipo2
                                                            .filter((jugador) => jugador.id === data[`jugador_${index+1}_equipo_2`] || !selectsEquipo2Seleccionado.includes(jugador.id))
                                                            .map((jugador) => (
                                                                <option key={jugador.id} value={jugador.id}>
                                                                    {`${jugador.nombre} ${jugador.apellido}`}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                    <img
                                                        src={data[`jugador_${index+1}_equipo_2`] ? (`/images/${jugadores.find(jugador => jugador.id === data[`jugador_${index+1}_equipo_2`]).foto_perfil}?${new Date().getTime()}`) : ''}
                                                        className="h-20 w-auto rounded-full"
                                                    />
                                                </div>
                                                <InputError message={errors[`jugador_${index+1}_equipo_2`]} className='mt-2 block w-full'/>
                                                </div>
                                                
                                            ))}

                                            </div>
                                        </div>
                                    </div>
                                        </>
                                    )}      
    

                                    <div className="flex items-center justify-center mt-4">
                                        {eliminar === true ? (
                                            <PrimaryButton className="ml-2" disabled={processing}>
                                                Eliminar
                                            </PrimaryButton>
                                        ) : (
                                            <>
                                            <PrimaryButton className="ml-2" disabled={processing}>
                                                Cargar
                                            </PrimaryButton>
                                            <SecondaryButton className='hover:bg-red-400 ml-2' onClick={closeModalCargarResultado}>
                                                CANCELAR
                                            </SecondaryButton>
                                            </>
                                        )}
                                        
                                    </div>
                                </form>
                            ) : (
                                <ModalError titulo={`El equipo no tiene el minimo de jugadores (5)`} cuerpo={`Debe tener al menos 5 jugadores para cargar el partido.`} accion={closeModalCargarResultado} />
                            )
                        ) : (
                            <ModalError titulo={'El equipo no tiene el minimo de jugadores (5)'} cuerpo={`Debe tener al menos 5 jugadores para cargar el partido.`} accion={closeModalCargarResultado} />
                        )
                    ) : (
                        <ModalError titulo={'No tiene fecha y horario'} cuerpo={'Debe tener fecha y horario cargados.'} accion={closeModalCargarResultado}/>
                    )
                ) : (
                        <ModalError titulo={'Faltan arbitros!'} cuerpo={`Debe tener los dos arbitros asignados para cargar el partido.`} accion={closeModalCargarResultado} />
                    )
            ) : (
                <ModalError titulo={'Aun no se ha jugado!'} cuerpo={'La fecha del partido aun no ha llegado, espere o edite la fecha.'} accion={closeModalCargarResultado} />
            )
            }
                
        </div>
    </div>
    {isModalErrorPuntosOpen&&(<ModalErrorPuntos esEmpate={esEmpate} titulo={'Los puntos no coinciden!'} equipos={equipos} equipoError={equipoErrorPuntos} closeModalErrorPuntos={closeModalErrorPuntos}/>)}
    </>
  )
}
export default ModalCargarPartido;