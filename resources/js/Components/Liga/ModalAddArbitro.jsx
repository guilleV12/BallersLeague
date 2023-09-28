import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'

export const ModalAddArbitro = ({ liga, accion, onCancel, onAdd }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
        id_liga:liga.id,
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('arbitros.store'), {onSuccess: ()=> {reset(); onAdd();}})
    }
  return (
    <div id="anadir-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-3 overflow-x-hidden overflow-y-auto`}>
        <div className="relative w-full max-w-md max-h-full shadow-xl shadow-gray-600 rounded-lg">
            <form onSubmit={submit} className=' bg-gray-200 border border-gray-800 px-20 py-10 rounded-lg shadow-xl' encType='multipart/form-data'>
                <div className='w-full flex justify-center items-center'>
                    <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-52 w-auto rounded-full" />
                </div>
                <div>
                    <InputLabel htmlFor='email' value='Email del arbitro'/>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        placeholder='usuario@email.com'
                        autoComplete='email'
                        isFocused={true}
                        className='mt-1 block w-full'
                    />
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
                <button type="button" className="text-white py-2.5 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-xs font-bold px-5 hover:white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={onCancel}>
                        CANCELAR
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}
