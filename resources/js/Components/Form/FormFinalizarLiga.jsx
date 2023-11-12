import React, { useState, useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import ModalInformarErrores from '../Modales/ModalInformarErrores';

const FormFinalizarLiga = ({
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
          
   
    </>
  );
};

export default FormFinalizarLiga;
