import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import SecondaryButton from '../SecondaryButton'

const CardEditarLiga = ({ setTituloAlert, liga, onEdit, onCancel, setShowAlert }) => {
    const { data, setData, processing, errors, setError } = useForm({
            nombre: liga.nombre,
            descripcion: liga.descripcion,
            ubicacion: liga.ubicacion,
            categoria: liga.categoria,
            logo: undefined,
    });

    const submit = (e) =>  {
        e.preventDefault();
        router.post(route('ligas.update',liga.id), {
            ...data,
            _method: 'put',
            forceFormData: true,
        },
         {onSuccess: ()=> {
                setShowAlert(true);
                setTituloAlert('Liga editada con exito!');
                onEdit();
                }
         ,onError: (response)=> {
                setError({ ...errors, ...response });
         },});
    };

  return (
    <>
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto'>
            <form onSubmit={submit} className=' bg-gray-100 py-5 px-20 rounded-lg border border-black shadow-lg ' encType='multipart/form-data'>
                <div className='w-full flex justify-center items-center'>
                        <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo liga: ${liga.nombre}`}  className='h-72 w-auto'/>
                </div>
                <div>
                        <InputLabel htmlFor='nombre' value='Nombre de liga'/>
                        <TextInput id="nombre" type="text" name="nombre" value={data.nombre} onChange={e => setData('nombre', e.target.value)} placeholder='Nombre de liga' autoComplete='nombre' isFocused={true} className='mt-1 block w-full'/>
                        <InputError message={errors.nombre} className='mt-2'/>
                </div>
                <div className='mt-4'>
                        <InputLabel htmlFor='descripcion' value='Descripcion de la liga'/>
                        <textarea name="descripcion" id="descripcion" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} type='text' placeholder='Descripcion' className='mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'></textarea>
                        <InputError message={errors.descripcion} className='mt-2'/>
                </div>
                <div className='mt-4'>
                        <InputLabel htmlFor='ubicacion' value='Ciudad donde se juega la liga'/>
                        <TextInput id="ubicacion" type="text" name="ubicacion" value={data.ubicacion} onChange={e => setData('ubicacion', e.target.value)} placeholder='Ciudad' autoComplete='ubicacion' className='mt-1 block w-full'/>
                        <InputError message={errors.ubicacion} className='mt-2'/>
                </div>
                <div className='mt-4'>
                        <InputLabel htmlFor='categoria' value='categoria de la liga'/>
                                <select id="categoria" name="categoria" value={data.categoria} onChange={e => setData('categoria', e.target.value)} className='mt-1 block w-full border-gray-300 focus:ring-orange-400 focus:border-orange-400 rounded-lg'>
                                        <option>Seleccione una categoria</option>
                                        <option value="Mayores">Mayores</option>
                                </select>
                        <InputError message={errors.categoria} className='mt-2'/>
                </div>
                <div className='mt-4 mb-5'>
                        <InputLabel htmlFor='logo' value='Logo de la liga'/>
                        <FileInput id="logo" type="file" name="logo" onChange={e => setData('logo', e.target.files[0])} placeholder='' autoComplete='logo' className='mt-1'/>
                        <InputError message={errors.logo} className='mt-2'/>
                </div>
                <div className="flex items-center justify-center">
                        <PrimaryButton className="ml-2" disabled={processing}>Editar liga</PrimaryButton>
                        <SecondaryButton className='hover:bg-red-400 ml-2' onClick={onCancel}>Cancelar</SecondaryButton>
                </div>
            </form>
        </div>
    </>
  )
}

export default CardEditarLiga;