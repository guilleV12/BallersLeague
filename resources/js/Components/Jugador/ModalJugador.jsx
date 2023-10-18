import React from 'react'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, router } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import FileInput from '@/Components/FileInput'
import SecondaryButton from '../SecondaryButton'

const ModalJugador = ({ jugador, equipo, onCancel, onAdd, onEdit, accion, setShowAlert, setTituloAlert }) => {

    const { data, setData, post, processing, reset, errors, setError } = useForm({
        nombre: (accion === 'agregar' ? '' : jugador.nombre),
        apellido: (accion === 'agregar' ? '' : jugador.apellido),
        dni: (accion === 'agregar' ? '' : jugador.dni),
        fecha_nacimiento: (accion === 'agregar' ? '' : jugador.fecha_nacimiento),
        foto_perfil: undefined,
        equipo_id:equipo.id,
        liga_id:equipo.liga_id,
    })

    const submit = (e) => {
        e.preventDefault();
        (accion === 'agregar') ? (
                post(route('jugadores.store'), 
                {onSuccess: ()=> {
                    setShowAlert(true);
                    setTituloAlert('Jugador creado con exito!');
                    reset();
                    onAdd();
                }})
        ) : (
                router.post(route('jugadores.update',jugador.id), {
                    ...data,
                    _method: 'put',
                    forceFormData: true,
                  },
                  {
                    onSuccess: () => {
                      setShowAlert(true);
                      setTituloAlert('Jugador editado con éxito!');
                      onEdit();
                    },
                    onError: (response) => {
                      setError({ ...errors, ...response });
                    },
                  })
        )
    }

  return (
    <>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>

    <div id="anadir-modal" className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-full shadow-lg border-black border rounded-lg z-50 mt-[2%]`}>
            <div className="relative w-full max-w-md max-h-full rounded-lg">

                    <form onSubmit={submit} className=' bg-gray-100 border border-gray-100 px-20 pb-5 rounded-lg shadow-xl' encType='multipart/form-data'>
                            <div className='w-full flex justify-center items-center mb-2'>
                                <img src={`/images/${accion === 'agregar' ? equipo.logo : jugador.foto_perfil}?${new Date().getTime()}`} alt={`logo de equipo ${equipo.logo}`} title={`logo de equipo ${equipo.logo}`} className="h-52 w-auto rounded-full" />
                            </div>
                            <div>
                                <InputLabel htmlFor='nombre' value='Nombre de jugador'/>
                                <TextInput id="nombre" type="text" name="nombre" value={data.nombre} onChange={e => setData('nombre', e.target.value)} placeholder='Nombre de jugador' autoComplete='nombre' isFocused={true} className='mt-1 block w-full'/>
                                <InputError message={errors.nombre} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='apellido' value='Apellido de jugador'/>
                                <TextInput id="apellido" type="text" name="apellido" value={data.apellido} onChange={e => setData('apellido', e.target.value)} placeholder='Apellido de jugador' autoComplete='apellido' isFocused={false} className='mt-1 block w-full'/>
                                <InputError message={errors.nombre} className='mt-2'/>
                            </div>
                            <div>
                                <TextInput id="equipo_id" type="text" name="equipo_id" readOnly value={data.equipo_id} autoComplete='equipo_id' className='hidden'/>
                                <InputError message={errors.equipo_id} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='dni' value='Dni de jugador'/>
                                <TextInput id="dni" type="text" name="dni" value={data.dni} onChange={e => setData('dni', e.target.value)} autoComplete='dni' placeholder='Numero de dni' className='mt-1 block w-full'/>
                                <InputError message={errors.dni} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='fecha_nacimiento' value='Fecha de nacimiento de jugador'/>
                                <TextInput id="fecha_nacimiento" type="date" name="fecha_nacimiento" value={data.fecha_nacimiento} onChange={e => setData('fecha_nacimiento', e.target.value)} autoComplete='fecha_nacimiento' placeholder='Numero de fecha_nacimiento' className='mt-1 block w-full'/>
                                <InputError message={errors.fecha_nacimiento} className='mt-2'/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='foto_perfil' value='Foto de jugador'/>
                                <FileInput id="foto_perfil" type="file" name="foto_perfil" onChange={e => setData('foto_perfil', e.target.files[0])} placeholder='' autoComplete='foto_perfil' className='mt-1'/>                                
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
                                <SecondaryButton className='hover:bg-red-400 ml-2' onClick={onCancel}>
                                    CANCELAR
                                </SecondaryButton>
                            </div>
                    </form>
            </div>
    </div>
    </>
  )
}

export default ModalJugador;