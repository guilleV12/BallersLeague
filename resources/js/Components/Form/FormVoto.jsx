import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import vsLogo from '../Images/vs.png';

const FormVoto = ({
  data,
  errors,
  equipos,
  setData,
  jugadores,
  handleSelectChange,
  liga
}) => {
  // Función para ordenar jugadores por equipo
  const ordenarJugadoresPorEquipo = () => {
    const jugadoresOrdenados = [];

    // Iterar sobre cada equipo
    equipos.forEach((equipo) => {
      // Filtrar jugadores que pertenecen al equipo actual
      const jugadoresEquipo = jugadores.filter((jugador) => jugador.equipo_id === equipo.id);

      // Agregar jugadores del equipo actual a la lista ordenada
      jugadoresOrdenados.push(...jugadoresEquipo);
    });

    return jugadoresOrdenados;
  };

  // Obtener la lista de jugadores ordenada por equipo
  const jugadoresOrdenados = ordenarJugadoresPorEquipo();

  return (
    <>
      <div className='mx-3 pt-0 p-3 bg-gray-100 rounded-lg border border-black'>
        <div className='flex flex-col items-center w-full'>
          <div className='w-full flex items-baseline justify-start'>
            {data[`jugador_id`] ? (
                <div className='w-[50%] flex items-center mt-5'>
                    <div className='w-36 h-36 rounded-full bg-white flex justify-center items-center border border-black'>
                        <img src={data[`jugador_id`] ? (`/images/${jugadores.find(jugador => jugador.id === data[`jugador_id`]).foto_perfil}?${new Date().getTime()}`) : ''} className="h-auto w-32 rounded-full"/>
                    </div>
                </div>
             ):('')
            }
            <select
                id='jugador_id'
                name='jugador_id'
                value={data.jugador_id}
                onChange={(e) => {
                setData('jugador_id', parseInt(e.target.value));
                }}
                className='form-select mt-1 block w-full h-10 focus:ring-orange-500 focus:border-orange-500 rounded-lg'
            >
                <option value=''>Selecciona un jugador</option>
                {jugadoresOrdenados.map((jugador) => (
                <option key={jugador.id} value={jugador.id}>
                    {`${jugador.nombre} ${jugador.apellido} - ${equipos.find((equipo) => equipo.id === jugador.equipo_id)?.nombre || ''}`}
                </option>
                ))}
            </select>
            {errors.jugador_id && <InputError>{errors.jugador_id}</InputError>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormVoto;
