import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import SecondaryButton from '../SecondaryButton'

const ModalEquipo = ({ equipo, liga, onCancel, onAdd, onEdit, className, accion, setShowAlert, setTituloAlert }) => {
    const { data, setData, post, processing, reset, errors, setError } = useForm({
        nombre: (accion === 'agregar' ? '' : equipo.nombre),
        descripcion: (accion === 'agregar' ? '' : equipo.descripcion),
        logo: undefined,
        liga_id:liga.id,
    });
console.log(equipo.id);
    const submit = (e) => {
            e.preventDefault();
            (accion === 'agregar') ? (
                    post(route('equipos.store'), 
                    {onSuccess: ()=> {
                        setShowAlert(true);
                        setTituloAlert('Equipo creado con exito!');
                        reset();
                        onAdd();
                    }})
            ) : (
                    router.post(route('equipos.update',equipo.id), {
                        ...data,
                        _method: 'put',
                        forceFormData: true,
                    }, 
                    {onSuccess: ()=> {
                        setShowAlert(true);
                        setTituloAlert('Equipo editado con exito!');
                        onEdit();
                    },onError: (response)=>{
                        setError({...errors, ...response})
                    },})
            )
    };
return (
    <>
    <div id="anadir-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto ${className}`}>
            <div className="relative w-full max-w-md max-h-full shadow-lg border-black border rounded-lg">
                    <form onSubmit={submit} className=' bg-gray-100 px-20 py-5 rounded-lg' encType='multipart/form-data'>
                            <div className='w-full flex justify-center items-center mb-2'>
                                    <img src={(`/images/${accion === 'agregar' ? (liga.logo) : (equipo.logo)}?${new Date().getTime()}`)} alt={'logo de liga '+liga.nombre} title={'logo de liga '+liga.nombre} className="h-52 w-auto rounded-full border border-black" />
                            </div>
                            <div>
                                <InputLabel htmlFor='nombre' value='Nombre de equipo'/>
                                <TextInput id="nombre" type="text" name="nombre" value={data.nombre} onChange={e => setData('nombre', e.target.value)} placeholder='Nombre de equipo' autoComplete='nombre' isFocused={true} className='mt-1 block w-full'/>
                                <InputError message={errors.nombre} className='mt-2'/>
                            </div>
                            <div>
                                <TextInput id="liga_id" type="text" name="liga_id" readOnly value={data.liga_id} autoComplete='liga_id' className='hidden'/>
                                <InputError message={errors.liga_id} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='descripcion' value='Descripcion de equipo'/>
                                    <textarea name="descripcion" id="descripcion" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} type='text' placeholder='Descripcion' className='mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'></textarea>
                                <InputError message={errors.descripcion} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='logo' value='Logo de equipo'/>
                                <FileInput id="logo" type="file" name="logo" onChange={e => setData('logo', e.target.files[0])} placeholder='' autoComplete='logo' className='mt-1'/>
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
                                <SecondaryButton className='hover:bg-red-400 ml-2' onClick={onCancel}>Cancelar</SecondaryButton>
                            </div>
                    </form>
            </div>
    </div>
    </>
  )
}

export default ModalEquipo;