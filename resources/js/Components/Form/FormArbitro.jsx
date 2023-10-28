import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

const FormArbitro = ({
  elementoName,
  onCancel,
  data,
  errors,
  setData
}) => {



  return (
    <>
          <TextInput
              id="id_liga"
              type="number"
              name="id_liga"
              value={data.id_liga}
              disabled={true}
              autoComplete='id_liga'
              className='hidden'
            />
          <div>
            <InputLabel
              htmlFor='email'
              value={`Email del ${elementoName.toLowerCase()}`} // Modificar para que funcione para cualquier tipo de elemento
              className='text-xs'
            />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder={`usuario@${elementoName.toLowerCase()}.com`} // Modificar para que funcione para cualquier tipo de elemento
              autoComplete='email'
              isFocused={true}
              icon={<ion-icon name="at-circle-outline"></ion-icon>}
              className='mt-1 block w-full text-sm'
            />
            <InputError
              message={errors.email}
              className='mt-2'
            />
          </div>
   
    </>
  );
};

export default FormArbitro;
