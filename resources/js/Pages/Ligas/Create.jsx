import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head, Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import CardInfo from '@/Components/CardInfo'
import Alert from '@/Components/Alerts/Alert'
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion'
import { BotonContenido } from '@/Components/BotonesAcciones'

const Create = ({ user, liga }) => {
    
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        categoria: '',
        logo:undefined,
    });
    const submit = (e) => {
        e.preventDefault()
        post(route('ligas.store'), {onSuccess: ()=> reset() })
    };
  return (
    <>
    <Head 
        title='Crear liga'
        />
    <AuthenticatedLayout 
        user={user} 
        liga={liga} 
        miLiga={liga}> 

        <main className='flex justify-center w-full h-fit lg:pl-[13rem]'>
        {(liga[0]) ? ( 
                    <AlertRedireccion 
                        titulo={'Solo puede tener una liga activa a la vez! Sera redirigido a su liga'} 
                        texto={''} 
                        tiempo={3500} 
                        icono={'error'} 
                        redirectUrl={route('ligas.show',user.id)}
                        />
            ) : (
            <form onSubmit={submit} className='bg-white w-[90%] md:w-fit h-fit border border-black px-10 py-5 rounded-lg shadow-lg shadow-gray-500' encType='multipart/form-data'>
                    <div className='w-full flex justify-center items-center'>
                            <ApplicationLogo 
                                texto={true} 
                                className='m-0 pl-2 w-60'
                                />
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
                            className='mt-1 block w-full text-sm'
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
                            className='mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm text-sm'
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
                            id="ubicacion" type="text" 
                            name="ubicacion" 
                            value={data.ubicacion} 
                            onChange={e => setData('ubicacion', e.target.value)} 
                            placeholder='Ciudad' 
                            autoComplete='ubicacion' 
                            className='mt-1 block w-full text-sm'
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
                            value='Categoria de liga'
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
                                className='pl-14 mt-1 block w-full border-gray-300 focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'
                                >
                                    <option>Seleccione una categoria</option>
                                    <option value="Mayores">Mayores</option>
                                </select>   
                        </div>                     
                        <InputError 
                            message={errors.categoria} 
                            className='mt-2'
                            />
                    </div>
                    <div className='mt-4'>
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
                            className='mt-1 text-sm'
                            />
                        <InputError 
                            message={errors.logo} 
                            className='mt-2'
                            />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <BotonContenido
                            className={' ml-4 bg-black'}
                            nombre={'Crear liga'}
                            />
                    </div>
            </form>
        )}
        </main>
    </AuthenticatedLayout>
    </>
  )
}

export default Create