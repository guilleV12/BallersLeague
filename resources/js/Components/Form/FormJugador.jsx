import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import FileInput from '../FileInput';

const FormJugador = ({
  elementoName,
  onCancel,
  data,
  errors,
  setData,
  accion
}) => {



  return (
    <>
    <div>
        <InputLabel 
            htmlFor='nombre' 
            value='Nombre de jugador'
            className={' text-xs'}
            />
        <TextInput 
            id="nombre" 
            type="text" 
            name="nombre" 
            value={data.nombre} 
            onChange={e => setData('nombre', e.target.value)} 
            placeholder='Nombre de jugador' 
            autoComplete='nombre' 
            isFocused={true} 
            className='mt-1 block w-full text-sm'
            icon={<ion-icon name="person"></ion-icon>}
            />
        <InputError 
            message={errors.nombre} 
            className='mt-2'
            />
    </div>
    <div className='mt-4'>
        <InputLabel 
            htmlFor='apellido' 
            value='Apellido de jugador'
            className={' text-xs'}
            />
        <TextInput 
            id="apellido" 
            type="text" 
            name="apellido" 
            value={data.apellido} 
            onChange={e => setData('apellido', e.target.value)} 
            placeholder='Apellido de jugador' 
            autoComplete='apellido' 
            isFocused={false} 
            className='mt-1 block w-full text-sm'
            icon={<ion-icon name="person"></ion-icon>}
            />
        <InputError 
            message={errors.nombre} 
            className='mt-2'
            />
    </div>
    <div>
        <TextInput 
            id="equipo_id" 
            type="text" 
            name="equipo_id" 
            readOnly 
            value={data.equipo_id} 
            autoComplete='equipo_id' 
            className='hidden'
            />
        <InputError 
            message={errors.equipo_id} 
            className='mt-2'
            />

    </div>
    <div className='mt-4'>
        <InputLabel 
            htmlFor='dni' 
            value='Dni de jugador'
            className={' text-xs'}
            />
        <TextInput 
            id="dni" 
            type="text" 
            name="dni" 
            value={data.dni} 
            onChange={e => setData('dni', e.target.value)} 
            autoComplete='dni' 
            placeholder='Numero de dni' 
            className='mt-1 block w-full text-sm'
            icon={<ion-icon name="document-text"></ion-icon>}
            />
        <InputError 
            message={errors.dni} 
            className='mt-2'
            />
    </div>
    <div className='mt-4'>
        <InputLabel 
            htmlFor='fecha_nacimiento' 
            value='Fecha de nacimiento de jugador'
            className={' text-xs'}
            />
        <TextInput 
            id="fecha_nacimiento" 
            type="date" 
            name="fecha_nacimiento" 
            value={data.fecha_nacimiento} 
            onChange={e => setData('fecha_nacimiento', e.target.value)} 
            autoComplete='fecha_nacimiento' 
            placeholder='Numero de fecha_nacimiento' 
            className='mt-1 block w-full text-sm'
            sacarPadding={true}
            />
        <InputError 
            message={errors.fecha_nacimiento} 
            className='mt-2'
            />
    </div>
    <div className='mt-4'>
        <InputLabel 
            htmlFor='foto_perfil' 
            value='Foto de jugador'
            className={' text-xs'}
            />
        <FileInput 
            id="foto_perfil" 
            type="file" 
            name="foto_perfil" 
            onChange={e => setData('foto_perfil', e.target.files[0])} 
            placeholder='' 
            autoComplete='foto_perfil' 
            className='mt-1 text-sm'
            />                                
        <InputError 
            message={errors.foto_perfil} 
            className='mt-2'
            />
    </div> 
    </>
  );
};

export default FormJugador;
