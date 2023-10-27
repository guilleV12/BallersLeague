import React, { useEffect, useState } from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import SecondaryButton from '../SecondaryButton'
import { BotonCancelar, BotonEditar } from '../BotonesAcciones'

const ModalEditarLiga = ({ setTituloAlert, liga, onEdit, onCancel, setShowAlert }) => {
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
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40  bg-black opacity-50 "></div>

        <div className="fixed top-[23%] md:top-[10%] left-[55%] md:left-[50%] lg:left-[57%] w-fit inset-0 md:inset-0 transform -translate-x-1/2 z-50 mb-3 md:mb-2 rounded-lg overflow-y-scroll">
           <form onSubmit={submit} className="bg-gray-50 px-2 md:px-20 pb-5 rounded-lg modal-content border border-black" encType="multipart/form-data">
                <div className='w-full flex justify-center items-center mt-1'>
                        <div className='w-52 h-52 rounded-full bg-white flex justify-center items-center'>
                                <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo liga: ${liga.nombre}`}  className='h-auto w-44 rounded-full'/>
                        </div>
                </div>
                <div>
                        <InputLabel 
                                htmlFor='nombre' 
                                value='Nombre de liga'
                                className={' text-xs'}
                                />
                        <TextInput 
                                id="nombre" 
                                type="text" 
                                name="nombre" 
                                value={data.nombre} 
                                onChange={e => setData('nombre', e.target.value)} 
                                placeholder='Nombre de liga' 
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
                <div className='mt-4'>
                        <InputLabel 
                                htmlFor='descripcion' 
                                value='Descripcion de la liga'
                                className={' text-xs'}
                                />
                        <textarea 
                                name="descripcion" 
                                id="descripcion" 
                                value={data.descripcion} 
                                onChange={e => setData('descripcion', e.target.value)} 
                                type='text' 
                                placeholder='Descripcion' 
                                className='mt-1 block text-sm w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'
                                >
                                </textarea>
                        <InputError 
                                message={errors.descripcion} 
                                className='mt-2'
                                />
                </div>
                <div className='mt-4'>
                        <InputLabel 
                                htmlFor='ubicacion' 
                                value='Ciudad donde se juega la liga'
                        className={' text-xs'}
                                />
                        <TextInput 
                                id="ubicacion" 
                                type="text" 
                                name="ubicacion" 
                                value={data.ubicacion} 
                                onChange={e => setData('ubicacion', e.target.value)} 
                                placeholder='Ciudad' 
                                autoComplete='ubicacion' 
                                className='mt-1 block w-full'
                                icon={<ion-icon name="location"></ion-icon>}
                                />
                        <InputError 
                                message={errors.ubicacion} 
                                className='mt-2'
                                />
                </div>
                <div className='mt-4'>
                        <InputLabel 
                                htmlFor='categoria' 
                                value='categoria de la liga'
                                className={' text-xs'}
                                />
                        <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex w-[3rem] justify-center items-center pointer-events-none bg-gray-300 rounded-l-md">
                                        <ion-icon name="accessibility"></ion-icon>
                                </div>
                                <select 
                                        id="categoria" 
                                        name="categoria" 
                                        value={data.categoria} 
                                        onChange={e => setData('categoria', e.target.value)} 
                                        className='pl-14 text-sm mt-1 block w-full border-gray-300 focus:ring-orange-400 focus:border-orange-400 rounded-lg'>
                                        <option>Seleccione una categoria</option>
                                        <option value="Mayores">Mayores</option>
                                        </select>
                        </div>
                        <InputError 
                                message={errors.categoria} 
                                className='mt-2'
                                />
                </div>
                <div className='mt-4 mb-5'>
                        <InputLabel 
                                htmlFor='logo' 
                                value='Logo de la liga'
                        className={' text-xs'}
                                />
                        <FileInput 
                                id="logo" 
                                type="file" 
                                name="logo" 
                                onChange={e => setData('logo', e.target.files[0])} 
                                placeholder='' 
                                autoComplete='logo' 
                                className='mt-1 text-sm'/>
                        <InputError 
                                message={errors.logo} 
                                className='mt-2'
                                />
                </div>
                <div className="flex items-center justify-center space-x-4">
                        <BotonEditar
                                className={'ml-2'}
                                />
                        <BotonCancelar
                                onClick={onCancel}
                                />
                </div>
            </form>
        </div>
    </>
  )
}

export default ModalEditarLiga;