import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import DateInput from '../DateInput';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import TextInput from '../TextInput';
import { BotonCancelar, BotonEditar } from '../BotonesAcciones';

export const ModalEditarFecha = ({ liga, closeModalEditarFecha, fechaEditar, arbitros, users, setShowAlert, setTituloAlert }) => {
    const { data, setData, post, processing, reset, errors, setError } = useForm({
        fecha: fechaEditar.fecha ? fechaEditar.fecha : '',
        horario: fechaEditar.horario ? fechaEditar.horario : '',
        arbitro_1: fechaEditar.arbitro_1 ? fechaEditar.arbitro_1 : '',
        arbitro_2: fechaEditar.arbitro_2 ? fechaEditar.arbitro_2 : '',
    });

    const submit = (e) => {
        e.preventDefault();
        router.patch(route('fechapartido.update', fechaEditar.id), {
            ...data,
        }, {
            onSuccess: () => {
                reset();
                closeModalEditarFecha();
                setShowAlert(true);
                setTituloAlert('Fecha editada con exito!');
            },
            onError: (response) => {
                setError({ ...errors, ...response });
            },
        });
    };

    const [arbitrosSelecto1, setArbitrosSelecto1] = useState(0);
    const [arbitrosSelecto2, setArbitrosSelecto2] = useState(0);

    return (
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>
    
        <div className={`fixed top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-fit max-h-full shadow-lg border-black border rounded-lg z-50`}>
                <form onSubmit={submit} className=' bg-gray-100 border border-gray-100 px-20 pb-5 rounded-lg shadow-xl' encType='multipart/form-data'>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-56 h-56 rounded-full bg-white flex justify-center items-center mb-2'>
                            <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo de equipo ${liga.logo}`} title={`logo de equipo ${liga.logo}`} className="h-52 w-auto rounded-full" />
                        </div>
                    </div>
                    <div>
                        <InputLabel 
                            htmlFor='fecha' 
                            value='Fecha de partido'
                            className={' text-xs'}
                            />
                        <DateInput 
                            id="fecha" 
                            type="date" 
                            name="fecha" 
                            value={data.fecha} 
                            onChange={e => setData('fecha', e.target.value)} 
                            autoComplete='fecha' 
                            isFocused={true} 
                            className='mt-1 block w-full text-sm'
                            />
                        <InputError 
                            message={errors.fecha} 
                            className='mt-2'
                            />
                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='horario' 
                            value='Horario de partido'
                            className={' text-xs'}
                            />
                        <TextInput 
                            id="horario" 
                            type="time" 
                            name="horario" 
                            value={data.horario} 
                            onChange={e => setData('horario', e.target.value)} 
                            autoComplete='horario' 
                            className='mt-1 block w-full sm'
                            icon={<ion-icon name="alarm"></ion-icon>}
                            />
                        <InputError 
                            message={errors.horario} 
                            className='mt-2'
                            />
                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='arbitro_1' 
                            value='Árbitro 1'
                            className={' text-xs'}
                            />
                        <select id="arbitro_1" name="arbitro_1" value={data.arbitro_1} onChange={(e) => { setData('arbitro_1', e.target.value); setArbitrosSelecto1(e.target.value);}} className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm'>
                            <option value="">Selecciona una opción</option>
                            {arbitros && arbitros.length > 0 ? (
                                arbitros
                                    .filter(arbitro => arbitro.confirmado === 1)
                                    .map(arbitro => (
                                        users.map(usuario => (
                                            ((usuario.id === arbitro.id_user) && (arbitro.id !== parseInt(arbitrosSelecto2))) &&(
                                                <option key={arbitro.id} value={arbitro.id} >
                                                    {usuario.nombre + ' ' + usuario.apellido}
                                                </option>)
                                        ))
                                    ))
                            ) : (
                                // Puedes renderizar algo aquí si no hay árbitros confirmados
                                <option value="">No hay árbitros confirmados</option>
                            )}
                        </select>
                        <InputError 
                            message={errors.arbitro_1} 
                            className='mt-2'
                            />

                    </div>
                    <div className='mt-4'>
                        <InputLabel 
                            htmlFor='arbitro_2' 
                            value='Árbitro 2' 
                            className={' text-xs'}
                            />
                        <select id="arbitro_2" name="arbitro_2" value={data.arbitro_2} onChange={(e) => { setData('arbitro_2', e.target.value); setArbitrosSelecto2(e.target.value);}} className='block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg text-sm mt-1'>
                            <option value="">Selecciona una opción</option>
                            {arbitros && arbitros.length > 0 ? (
                                arbitros
                                    .filter(arbitro => arbitro.confirmado === 1)
                                    .map(arbitro => (
                                        users.map(usuario => (
                                            ((usuario.id === arbitro.id_user) && (arbitro.id !== parseInt(arbitrosSelecto1))) &&(
                                                <option key={arbitro.id} value={arbitro.id} >
                                                    {usuario.nombre + ' ' + usuario.apellido}
                                                </option>)
                                        ))
                                    ))
                            ) : (
                                // Puedes renderizar algo aquí si no hay árbitros confirmados
                                <option value="">No hay árbitros confirmados</option>
                            )}
                        </select>
                        <InputError 
                            message={errors.arbitro_2} 
                            className='mt-2'
                            />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <BotonEditar
                            className={' ml-2'}
                            />
                        <BotonCancelar
                            className={' ml-2'}
                            onClick={closeModalEditarFecha}
                            />
                    </div>
                </form>
        </div>
        </>
    )
}
export default ModalEditarFecha;
