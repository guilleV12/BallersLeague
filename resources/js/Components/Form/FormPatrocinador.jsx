import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import FileInput from '../FileInput';
import Checkbox from '../Checkbox';

const FormPatrocinador = ({
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
                    value='Nombre de patrocinador'
                    className={' text-xs'}
                    />
                <TextInput 
                    id="nombre" 
                    type="text" 
                    name="nombre" 
                    value={data.nombre} 
                    onChange={e => setData('nombre', e.target.value)} 
                    placeholder='Nombre de patrocinador' 
                    autoComplete='nombre' 
                    isFocused={true} 
                    className='mt-1 block w-full'
                    icon={<ion-icon name="document-text"></ion-icon>}
                    />
                <InputError 
                    message={errors.nombre} 
                    className='mt-2'
                    />
            </div>
            <div>
                <TextInput 
                    id="liga_patrocinada" 
                    type="text" 
                    name="liga_patrocinada" 
                    readOnly 
                    value={data.liga_patrocinada} 
                    autoComplete='liga_patrocinada' 
                    className='hidden'
                    />
                <InputError 
                    message={errors.liga_patrocinada} 
                    className='mt-2'
                    />
            </div>
            <div className='mt-4'>
                <InputLabel 
                    htmlFor='descripcion' 
                    value='Descripcion de patrocinador'
                    className={' text-xs'}
                    />
                <textarea 
                    name="descripcion" 
                    id="descripcion" 
                    value={data.descripcion} 
                    onChange={e => setData('descripcion', e.target.value)} 
                    type='text' 
                    placeholder='Descripcion' 
                    className='mt-1 text-sm block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'
                    >
                    </textarea>
                <InputError 
                    message={errors.descripcion} 
                    className='mt-2'
                    />
            </div>
            <div className='mt-4'>
                <InputLabel 
                    htmlFor='logo' 
                    value='Logo de patrocinador'
                    className={' text-xs'}
                    />
                <FileInput 
                    id="logo" 
                    type="file" 
                    name="logo" 
                    onChange={e => setData('logo', e.target.files[0])} 
                    placeholder='' 
                    autoComplete='logo' 
                    className='mt-1 text-sm'
                    />
                <InputError 
                    message={errors.logo} 
                    className='mt-2'
                    />
            </div>
            <div className='mt-4 flex'>
                <Checkbox
                        id="prioridad" 
                        type="text" 
                        name="prioridad"
                        autoComplete='prioridad' 
                        checked={data.prioridad}
                        onChange={e => setData('prioridad', e.target.checked)}
                        className='mr-1'
                        />
                <InputLabel 
                    htmlFor='prioridad' 
                    value='Es patrocinador prioritario? Aparecera en pantallas de la liga.'
                    className={' text-sm'}
                    />
                <InputError 
                    message={errors.prioridad} 
                    className='mt-2'
                    />
            </div>
    </>
  );
};

export default FormPatrocinador;
