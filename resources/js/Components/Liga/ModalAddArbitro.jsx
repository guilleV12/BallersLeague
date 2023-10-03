import React,{ useState } from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import SecondaryButton from '../SecondaryButton'

export const ModalAddArbitro = ({ liga, accion, onCancel, onAdd, setShowAlert, setTituloAlert }) => {

    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
        id_liga:liga.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('arbitros.store'), {
            onSuccess: ()=> {
                setShowAlert(true);
                setTituloAlert('Arbitro invitado con exito!');
                reset();
                onAdd(); 
            }
        })
    }
  return (
    <div id="anadir-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-3 overflow-x-hidden overflow-y-auto`}>
            <div className="relative w-full max-w-md max-h-full shadow-lg rounded-lg border border-black">
                    <form onSubmit={submit} className=' bg-gray-100 px-20 py-10 rounded-lg' encType='multipart/form-data'>
                        <div className='w-full flex justify-center items-center'>
                            <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-52 w-auto rounded-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor='email' value='Email del arbitro'/>
                            <TextInput id="email" type="email" name="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder='usuario@email.com' autoComplete='email' isFocused={true} className='mt-1 block w-full'/>
                            <InputError message={errors.email} className='mt-2'/>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <PrimaryButton className="ml-2 mr-3" disabled={processing}>
                                {accion === 'agregar' ? (
                                    'Agregar'
                                ) : (
                                    'Editar equipo'
                                )}  
                            </PrimaryButton>
                            <SecondaryButton className='hover:bg-red-400 ml-2' onClick={onCancel}>Cancelar</SecondaryButton>
                        </div>
                    </form>
            </div>
    </div>
  )
}