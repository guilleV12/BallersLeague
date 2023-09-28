import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head, Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import CardInfo from '@/Components/CardInfo'

const Create = ({user, liga}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        logo:undefined,
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('ligas.store'), {onSuccess: ()=> reset() })
    }

  return (
    <>
    <Head title='Crear liga'/>
    <AuthenticatedLayout user={user}>
        <main className='grid grid-cols-1 lg:pb-[9%] mt-5'>
        {(liga == -1) ? (
                    <CardInfo tipo={'info'} user={user}/>
                ) : ('')}
        {(liga.length>0) ? (
                    <CardInfo tipo={'error'} user={user}/>
            ) : (
            <form onSubmit={submit} className=' bg-white border-2 border-gray-300 px-20 py-10 rounded-lg shadow-xl mt-5' encType='multipart/form-data'>
                <div className='w-full flex justify-center items-center'>
                    <ApplicationLogo texto={true} className=''/>
                </div>
                <div>
                    <InputLabel htmlFor='nombre' value='Nombre de liga'/>
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
                    />
                    <InputError message={errors.nombre} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='descripcion' value='Descripcion de la liga'/>
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
                    <InputLabel htmlFor='ubicacion' value='Ciudad donde se juega la liga'/>
                    <TextInput
                        id="ubicacion"
                        type="text"
                        name="ubicacion"
                        value={data.ubicacion}
                        onChange={e => setData('ubicacion', e.target.value)}
                        placeholder='Ciudad'
                        autoComplete='ubicacion'
                        className='mt-1 block w-full'
                    />
                    <InputError message={errors.ubicacion} className='mt-2'/>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='logo' value='Logo de la liga'/>
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
                    <PrimaryButton className="ml-4" disabled={processing}>
                            Crear liga
                    </PrimaryButton>
                </div>
            </form>
        )}
        </main>
    </AuthenticatedLayout>
    </>
  )
}

export default Create