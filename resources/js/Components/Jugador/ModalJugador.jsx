import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'

const ModalJugador = ({ jugador, equipo, liga, onCancel, onAdd, onEdit, accion }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: (accion === 'agregar' ? '' : jugador.nombre),
        apellido: (accion === 'agregar' ? '' : jugador.apellido),
        dni: (accion === 'agregar' ? '' : jugador.dni),
        foto_perfil: undefined,
        equipo_id:equipo.id,
    })
    const submit = (e) => {
        e.preventDefault();
        (accion === 'agregar') ? (
            post(route('jugadores.store'), {onSuccess: ()=> {reset(); onAdd();}})
        ) : (
            router.post(route('jugadores.update',jugador.id), {
                ...data,
                _method: 'put',
                forceFormData: true,
            }, {onSuccess: ()=> {onEdit();}})
        )
    }
  return (
    <>
    <div id="anadir-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-3 overflow-x-hidden overflow-y-auto`}>
        <div className="relative w-full max-w-md max-h-full shadow-xl shadow-gray-600 border-gray-800 border rounded-lg">
            <form onSubmit={submit} className=' bg-gray-200 border-2 border-gray-300 px-20 py-10 rounded-lg shadow-xl' encType='multipart/form-data'>
                <div className='w-full flex justify-center items-center'>
                    <img src={`/images/${accion === 'agregar' ? equipo.logo : jugador.foto_perfil}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-52 w-auto rounded-full" />
                </div>
                <div>
                    <InputLabel htmlFor='nombre' value='Nombre de jugador'/>
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                        placeholder='Nombre de jugador'
                        autoComplete='nombre'
                        isFocused={true}
                        className='mt-1 block w-full'
                    />
                    <InputError message={errors.nombre} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='apellido' value='Apellido de jugador'/>
                    <TextInput
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={data.apellido}
                        onChange={e => setData('apellido', e.target.value)}
                        placeholder='Apellido de jugador'
                        autoComplete='apellido'
                        isFocused={true}
                        className='mt-1 block w-full'
                    />
                    <InputError message={errors.nombre} className='mt-2'/>
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
                    <InputError message={errors.equipo_id} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='dni' value='Dni de jugador'/>
                    <TextInput
                        id="dni"
                        type="text"
                        name="dni"
                        value={data.dni}
                        onChange={e => setData('dni', e.target.value)}
                        autoComplete='dni'
                        placeholder='Numero de dni'
                        className='mt-1 block w-full'
                    />
                    <InputError message={errors.dni} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='foto_perfil' value='Foto de jugador'/>
                    <FileInput
                        id="foto_perfil"
                        type="file"
                        name="foto_perfil"
                        onChange={e => setData('foto_perfil', e.target.files[0])}
                        placeholder=''
                        autoComplete='foto_perfil'
                        className='mt-1'
                    />
                    
                    <InputError message={errors.foto_perfil} className='mt-2'/>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ml-2" disabled={processing}>
                        {accion === 'agregar' ? (
                            'Agregar'
                        ) : (
                            'Editar'
                        )}  
                    </PrimaryButton>
                <button type="button" className="text-white py-2.5 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-xs font-bold px-5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={onCancel}>
                        CANCELAR
                </button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ModalJugador;