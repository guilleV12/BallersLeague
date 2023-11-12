import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import DateInput from '../DateInput';

const FormPlayoffs = ({
  elementoName,
  onCancel,
  data,
  errors,
  equipos,
  setData
}) => {

    const maxEquipos = equipos.length;
    const opcionesPermitidas = [4, 8, 16, 32];

  return (
    <>
    
        <div className='mt-4'>
            <InputLabel 
                htmlFor='cantidad_equipos' 
                value='Cantidad de equipos' 
                className=' text-xs'
                />
            <select 
                id="cantidad_equipos" 
                name="cantidad_equipos" 
                value={data.cantidad_equipos} 
                onChange={e => setData('cantidad_equipos', parseInt(e.target.value))} 
                className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'
                >
                   <option value="">Selecciona una opción</option>
                    {opcionesPermitidas.map((opcion, index) => {
                        return opcion <= maxEquipos ? (
                        <option key={index} value={opcion}>
                            {opcion} equipos
                        </option>
                        ) : null;
                    })}
                </select>
            <InputError 
                message={errors.cantidad_equipos} 
                className='mt-2'
                />
        </div>            
        <div className='mt-4'>
            <InputLabel 
                htmlFor='cantidad_partidos' 
                value='Cantidad de partidos' 
                className=' text-xs'
                />
            <select 
                id="cantidad_partidos" 
                name="cantidad_partidos" 
                value={data.cantidad_partidos} 
                onChange={e => setData('cantidad_partidos', parseInt(e.target.value))} 
                className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'
                >
                    <option value="">Selecciona una opción</option>
                    {[1, 3, 5, 7].map((value) => (
                        <option key={value} value={value}>
                            {value} partidos
                        </option>
                    ))}
                </select>
            <InputError 
                message={errors.cantidad_partidos} 
                className='mt-2'
                />
        </div>   
    </>
  );
};

export default FormPlayoffs;
