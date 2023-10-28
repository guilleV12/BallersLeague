import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import vsLogo from '../Images/vs.png';
import DateInput from '../DateInput';

const FormFecha = ({
  elementoName,
  onCancel,
  data,
  errors,
  equipos,
  setData,
  arbitros,
  users,
  setArbitrosSelecto1,
  setArbitrosSelecto2,
  arbitrosSelecto1,
  arbitrosSelecto2
}) => {

  return (
    <>
          <div>
                        <InputLabel 
                            htmlFor='fecha' 
                            value='Fecha de partido'
                            className={' text-xs'}
                            />
                        <DateInput 
                            id="fecha" 
                            type="date" 
                            name="fecha" 
                            value={data.fecha} 
                            onChange={e => setData('fecha', e.target.value)} 
                            autoComplete='fecha' 
                            isFocused={true} 
                            className='mt-1 block w-full text-sm'
                            />
                        <InputError 
                            message={errors.fecha} 
                            className='mt-2'
                            />
                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='horario' 
                            value='Horario de partido'
                            className={' text-xs'}
                            />
                        <TextInput 
                            id="horario" 
                            type="time" 
                            name="horario" 
                            value={data.horario} 
                            onChange={e => setData('horario', e.target.value)} 
                            autoComplete='horario' 
                            className='mt-1 block w-full sm'
                            icon={<ion-icon name="alarm"></ion-icon>}
                            />
                        <InputError 
                            message={errors.horario} 
                            className='mt-2'
                            />
                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='arbitro_1' 
                            value='Árbitro 1'
                            className={' text-xs'}
                            />
                        <select id="arbitro_1" name="arbitro_1" value={data.arbitro_1} onChange={(e) => { setData('arbitro_1', e.target.value); setArbitrosSelecto1(e.target.value);}} className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'>
                            <option value="">Selecciona una opción</option>
                            {arbitros && arbitros.length > 0 ? (
                                arbitros
                                    .filter(arbitro => arbitro.confirmado === 1)
                                    .map(arbitro => (
                                        users.map(usuario => (
                                            ((usuario.id === arbitro.id_user) && (arbitro.id !== parseInt(arbitrosSelecto2))) &&(
                                                <option key={arbitro.id} value={arbitro.id} >
                                                    {usuario.nombre + ' ' + usuario.apellido}
                                                </option>)
                                        ))
                                    ))
                            ) : (
                                // Puedes renderizar algo aquí si no hay árbitros confirmados
                                <option value="">No hay árbitros confirmados</option>
                            )}
                        </select>
                        <InputError 
                            message={errors.arbitro_1} 
                            className='mt-2'
                            />

                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='arbitro_2' 
                            value='Árbitro 2' 
                            className={' text-xs'}
                            />
                        <select id="arbitro_2" name="arbitro_2" value={data.arbitro_2} onChange={(e) => { setData('arbitro_2', e.target.value); setArbitrosSelecto2(e.target.value);}} className='block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm mt-1'>
                            <option value="">Selecciona una opción</option>
                            {arbitros && arbitros.length > 0 ? (
                                arbitros
                                    .filter(arbitro => arbitro.confirmado === 1)
                                    .map(arbitro => (
                                        users.map(usuario => (
                                            ((usuario.id === arbitro.id_user) && (arbitro.id !== parseInt(arbitrosSelecto1))) &&(
                                                <option key={arbitro.id} value={arbitro.id} >
                                                    {usuario.nombre + ' ' + usuario.apellido}
                                                </option>)
                                        ))
                                    ))
                            ) : (
                                // Puedes renderizar algo aquí si no hay árbitros confirmados
                                <option value="">No hay árbitros confirmados</option>
                            )}
                        </select>
                        <InputError 
                            message={errors.arbitro_2} 
                            className='mt-2'
                            />
                    </div>   

    </>
  );
};

export default FormFecha;
