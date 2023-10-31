import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import vsLogo from '../Images/vs.png';

const FormPartido = ({
  elementoName,
  onCancel,
  data,
  errors,
  equipos,
  setData,
  equiposFiltrados,
  selectsEquipo1Seleccionado,
  selectsEquipo2Seleccionado,
  jugadores,
  jugadoresEquipo1,
  jugadoresEquipo2,
  handleSelectChange,
  handleSelect2Change
}) => {

    const jugadoresFiltradosEquipo1 = jugadoresEquipo1.filter(jugador => jugador.deshabilitado === 0);
    const jugadoresFiltradosEquipo2 = jugadoresEquipo2.filter(jugador => jugador.deshabilitado === 0);

  return (
    <>
        <div className='border border-black rounded-lg mx-3 p-3 bg-white'>
                    <div className='w-full flex justify-center items-center mb-4 text-lg font-extrabold'>
                        Resultado
                    </div>
                    <div className='w-full flex justify-between items-center mb-2 text-base font-semibold'>
                        <div>
                            {equiposFiltrados[0].nombre}
                        </div>
                        <div>
                            {equiposFiltrados[1].nombre}
                        </div>
                    </div>
                    <div className='flex items-center justify-center space-x-2'>
                        <div className='w-1/4 flex justify-start items-center'>
                            <div className='w-24 h-24 rounded-full my-1 bg-white flex justify-center items-center'>
                                <img src={`/images/${equiposFiltrados[0].logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" />
                            </div>
                        </div>
                        <TextInput 
                            id="puntaje_equipo_1" 
                            type="number" 
                            name="puntaje_equipo_1" 
                            value={data.puntaje_equipo_1} 
                            placeholder={'Puntos'} 
                            onChange={e => setData('puntaje_equipo_1', parseInt(e.target.value))} 
                            autoComplete='puntaje_equipo_1' 
                            isFocused={true} 
                            sacarPadding={true}
                            className='mt-1 block w-3/4 text-xs'
                            />
                        <InputError 
                            message={errors.puntaje_equipo_1} 
                            className='mt-2'
                            />
                                
                        <img src={vsLogo} className="h-20 w-auto rounded-full mr-2" />

                        <InputLabel 
                            htmlFor='puntaje_equipo_2' 
                            value={''}
                            className=' text-xs'
                            />
                        <TextInput 
                            id="puntaje_equipo_2" 
                            type="number" 
                            name="puntaje_equipo_2" 
                            value={data.puntaje_equipo_2}
                            placeholder={'Puntos'} 
                            onChange={e => setData('puntaje_equipo_2', parseInt(e.target.value))} 
                            autoComplete='puntaje_equipo_2' 
                            sacarPadding={true}
                            className='mt-1 block w-3/4 text-xs'
                            />
                        <InputError 
                            message={errors.puntaje_equipo_2} 
                            className='mt-2'
                            />
                        <div className='w-1/4 flex justify-end items-center'>
                            <div className='w-24 h-24 rounded-full my-1 bg-white flex justify-center items-center'>
                                <img src={`/images/${equiposFiltrados[1].logo}?${new Date().getTime()}`} className="h-20 w-auto rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border border-black rounded-lg mx-3 p-3 bg-white mt-3'>
                    <div className='w-full flex justify-center items-center mt-6 mb-4 text-lg font-extrabold'>
                        Puntos individuales
                    </div>

                    <div className="grid grid-cols-2 mt-4 space-x-3">
                        <div className='flex flex-col'>
                        {Array.from({ length: 12 }, (_, index) => (
                            <div key={`jugador_${index+1}_equipo_1`} >
                            <div className={`flex items-center mt-2 space-x-1 `}>
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
                                    className="mt-1 block text-sm w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
                                >
                                    <option value='0'>Selecciona un jugador</option>
                                    {jugadoresFiltradosEquipo1
                                        .filter((jugador) => jugador.id === data[`jugador_${index+1}_equipo_1`] || !selectsEquipo1Seleccionado.includes(jugador.id))
                                        .map((jugador) => (
                                            <option key={jugador.id} value={jugador.id}>
                                                {`${jugador.nombre} ${jugador.apellido}`}
                                            </option>
                                        ))
                                    }
                                </select>

                                <TextInput
                                    sacarPadding={true}
                                    type="number"
                                    name={`puntos_equipos_1_jugador_${index + 1}`}
                                    value={data[`puntos_equipos_1_jugador_${index + 1}`]}
                                    onChange={(e) => {
                                        const puntos = parseInt(e.target.value);
                                        setData(`puntos_equipos_1_jugador_${index + 1}`, puntos);
                                    }}
                                    disabled={!data[`jugador_${index+1}_equipo_1`] || ''}
                                    className={`mt-1 text-xs block w-20 ${!data[`jugador_${index+1}_equipo_1`] || ''?('hidden'):('')}`}
                                />
                            </div>
                            <InputError 
                                message={errors[`jugador_${index+1}_equipo_1`]} 
                                className='mt-2 block w-full'
                                />
                            </div>
                        ))}
                        </div>

                        <div className='flex flex-col justify-end'>
                        {Array.from({ length: 12 }, (_, index) => (
                            <div key={`jugador_${index+1}_equipo_2`}>
                            <div className="flex items-center mt-2">   
                                <TextInput
                                    sacarPadding={true}
                                    type="number"
                                    name={`puntos_equipos_2_jugador_${index + 1}`}
                                    value={data[`puntos_equipos_2_jugador_${index + 1}`]}
                                    onChange={(e) => {
                                        const puntos = parseInt(e.target.value);
                                        setData(`puntos_equipos_2_jugador_${index + 1}`, puntos);
                                    }}
                                    disabled={!data[`jugador_${index+1}_equipo_2`] || ''}
                                    className={`mt-1 mr-1 text-xs block w-20 ${!data[`jugador_${index+1}_equipo_2`] || ''?('hidden'):('')}`}
                                />  
                                <select
                                    name={`jugador_${index+1}_equipo_2`}
                                    value={data[`jugador_${index+1}_equipo_2`]}
                                    onChange={(e) => {
                                        const jugadorSeleccionado = parseInt(e.target.value);
                                        handleSelect2Change(index, jugadorSeleccionado);
                                        setData(`jugador_${index + 1}_equipo_2`, jugadorSeleccionado);
                                    }}
                                    className="mt-1 text-sm block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
                                >
                                    <option value='0'>Selecciona un jugador</option>
                                    {jugadoresFiltradosEquipo2
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
                            <InputError 
                                message={errors[`jugador_${index+1}_equipo_2`]} 
                                className='mt-2 block w-full'
                                />
                            </div>                      
                        ))}
                        </div>
                    </div>
                </div>
    </>
  );
};

export default FormPartido;
