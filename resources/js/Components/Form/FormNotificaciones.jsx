import React from 'react'
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';

export const FormNotificaciones = ({
    elementoName,
    onCancel,
    data,
    errors,
    setData,
    accion
}) => {
   

  return (
    <>
    <div className='flex mt-5'>
        <Checkbox
                id="notificacion_partido" 
                type="text" 
                name="notificacion_partido"
                autoComplete='notificacion_partido' 
                checked={data.notificacion_partido}
                onChange={e => setData('notificacion_partido', e.target.checked)}
                className='mr-5'
                />
        <InputLabel 
            htmlFor='notificacion_partido' 
            value='Notificaciones de partidos'
            className={' text-sm'}
            />
        <InputError 
            message={errors.notificacion_partido} 
            className='mt-2'
            />
    </div>
    <div className='flex mt-5'>
            <Checkbox
                    id="notificacion_resultado" 
                    type="text" 
                    name="notificacion_resultado" 
                    autoComplete='notificacion_resultado' 
                    checked={data.notificacion_resultado}
                    onChange={e => setData('notificacion_resultado', e.target.checked)}
                    className='mr-5'
                    />
        <InputLabel 
            htmlFor='notificacion_resultado' 
            value='Notificaciones de resultados'
            className={' text-sm'}
            />
        <InputError 
            message={errors.notificacion_resultado} 
            className='mt-2'
            />
    </div>
    </>
  )
}
export default FormNotificaciones;