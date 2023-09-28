import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'

const ModalEquipo = ({ equipo, liga, onCancel, onAdd, onEdit, className, accion }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: (accion === 'agregar' ? '' : equipo.nombre),
        descripcion: (accion === 'agregar' ? '' : equipo.descripcion),
        logo: undefined,
        liga_id:liga.id,
    })
    const submit = (e) => {
        e.preventDefault();
        (accion === 'agregar') ? (
            post(route('equipos.store'), {onSuccess: ()=> {reset(); onAdd();}})
        ) : (
            router.post(route('equipos.update',equipo.id), {
                ...data,
                _method: 'put',
                forceFormData: true,
            }, {onSuccess: ()=> {onEdit();}})
        )
    }
    console.log(data);
  return (
    <>
    <div id="anadir-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-3 overflow-x-hidden overflow-y-auto ${className}`}>
        <div className="relative w-full max-w-md max-h-full shadow-xl shadow-gray-600 broder-gray-800 border-2 rounded-lg">
            <form onSubmit={submit} className=' bg-white border-2 border-gray-300 px-20 py-10 rounded-lg shadow-xl' encType='multipart/form-data'>
                <div className='w-full flex justify-center items-center'>
                    <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt="Logo de la Liga" className="h-52 w-auto rounded-full" />
                </div>
                <div>
                    <InputLabel htmlFor='nombre' value='Nombre de equipo'/>
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                        placeholder='Nombre de equipo'
                        autoComplete='nombre'
                        isFocused={true}
                        className='mt-1 block w-full'
                    />
                    <InputError message={errors.nombre} className='mt-2'/>
                </div>

                <div>
                    <TextInput
                        id="liga_id"
                        type="text"
                        name="liga_id"
                        readOnly
                        value={data.liga_id}
                        autoComplete='liga_id'
                        className='hidden'
                    />
                    <InputError message={errors.liga_id} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='descripcion' value='Descripcion de equipo'/>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        value={data.descripcion}
                        onChange={e => setData('descripcion', e.target.value)}
                        type='text'
                        placeholder='Descripcion'
                        className='mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'
                    >

                    </textarea>
                    <InputError message={errors.descripcion} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='logo' value='Logo de equipo'/>
                    <FileInput
                        id="logo"
                        type="file"
                        name="logo"
                        onChange={e => setData('logo', e.target.files[0])}
                        placeholder=''
                        autoComplete='logo'
                        className='mt-1'
                    />
                    
                    <InputError message={errors.logo} className='mt-2'/>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ml-2" disabled={processing}>
                        {accion === 'agregar' ? (
                            'Agregar equipo'
                        ) : (
                            'Editar equipo'
                        )}  
                    </PrimaryButton>
                <button type="button" className="text-white py-2 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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

export default ModalEquipo;