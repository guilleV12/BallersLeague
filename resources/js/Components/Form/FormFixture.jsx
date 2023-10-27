import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import DateInput from '../DateInput';

const FormFixture = ({
  elementoName,
  onCancel,
  data,
  errors,
  equipos,
  setData
}) => {

  return (
    <>
        <div>
            <InputLabel 
                htmlFor='fecha_inicial' 
                value='Fecha inicio de la liga' 
                className=' text-xs'
                />
            <DateInput 
                id="fecha_inicial" 
                type="date" 
                name="fecha_inicial" 
                value={data.fecha_inicial} 
                onChange={e => setData('fecha_inicial', e.target.value)} 
                autoComplete='fecha_inicial' 
                isFocused={true} 
                className='mt-1 block w-full text-sm'
                />
            <InputError 
                message={errors.fecha_inicial} 
                className='mt-2'
                />
        </div>
        <div className='mt-4'>
            <InputLabel 
                htmlFor='cantidad_vueltas' 
                value='Cantidad de partidos entre cada equipo (vueltas)' 
                className=' text-xs'
                />
            <select 
                id="cantidad_vueltas" 
                name="cantidad_vueltas" 
                value={data.cantidad_vueltas} 
                onChange={e => setData('cantidad_vueltas', e.target.value)} 
                className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'
                >
                    <option value="">Selecciona una opción</option>
                    {Array.from({ length: 5 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1} vuelta/s
                        </option>
                    ))}
                </select>
            <InputError 
                message={errors.cantidad_vueltas} 
                className='mt-2'
                />
        </div>               
    </>
  );
};

export default FormFixture;
