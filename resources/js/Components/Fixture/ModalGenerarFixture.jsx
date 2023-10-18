import React, {useState} from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'
import { useForm, router } from '@inertiajs/react'
import DateInput from '../DateInput'
import InputLabel from '../InputLabel'
import InputError from '../InputError'
import { ModalConfirmacionBorrar } from './ModalConfirmacionBorrar'

export const ModalGenerarFixture = ({ liga, closeGenerarFixtureModal, fechas, equipos, setShowAlert, setTituloAlert }) => {
    const [isModalConfirmacionFixture, setModalConfirmacionFixture] = useState(false);
    const [regenerar, setRegenerar] = useState(false);

    const openModalConfirmacionFixture = () => {
        setModalConfirmacionFixture(true);
    };

    const closeModalConfirmacionFixture = () => {
        setModalConfirmacionFixture(false);
    };

    const confirmarGenerarFixture = () => {
        setRegenerar(true); // Esto establece el estado cuando el usuario confirma
        setData('regenerarFixture', true);
        closeModalConfirmacionFixture();
    };

    const { data, setData, post, processing, reset, errors, setError } = useForm({
        fecha_inicial: '',
        cantidad_vueltas: '',
        liga_id: liga.id,
        regenerarFixture: '',
    });

    const enviar = () => {
        post(route('calendario.store'), {
            onSuccess: () => {
                reset();
                closeGenerarFixtureModal();
                setShowAlert(true);
                setTituloAlert('Fixture generado con exito!');
            },
            onError: (response) => {
                setError({ ...errors, ...response });
            },
            });
    };

    const submit = (e) => {
        e.preventDefault();
        if (fechas){
            if (fechas.length > 0){
                if (!regenerar){
                    openModalConfirmacionFixture();
                } else {
                    enviar();
                }
            } else {
                enviar();
            }
        } else {
            enviar();
        }
    };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>

    <div id="delete-confirmation-modal" className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-full shadow-lg border-black border rounded-lg z-50`}>
        <div className="relative w-full max-w-md max-h-full rounded-lg">
            {equipos &&( equipos.length > 1 ? (
                <form onSubmit={submit} className=' bg-gray-100 border border-gray-100 px-20 pb-5 rounded-lg shadow-xl' encType='multipart/form-data'>
                    <div className='w-full flex justify-center items-center mb-2'>
                        <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo de equipo ${liga.logo}`} title={`logo de equipo ${liga.logo}`} className="h-52 w-auto rounded-full" />
                    </div>
                    <div>
                        <InputLabel htmlFor='fecha_inicial' value='Fecha inicio de la liga'/>
                        <DateInput id="fecha_inicial" type="date" name="fecha_inicial" value={data.fecha_inicial} onChange={e => setData('fecha_inicial', e.target.value)} autoComplete='fecha_inicial' isFocused={true} className='mt-1 block w-full'/>
                        <InputError message={errors.fecha_inicial} className='mt-2'/>
                    </div>
                    <div className='mt-4'>
                        <InputLabel htmlFor='cantidad_vueltas' value='Cantidad de partidos entre cada equipo (vueltas)'/>
                        <select id="cantidad_vueltas" name="cantidad_vueltas" value={data.cantidad_vueltas} onChange={e => setData('cantidad_vueltas', e.target.value)} className='mt-1 block w-full focus:ring-orange-400 focus:border-orange-400 rounded-lg mt-1'>
                            <option value="">Selecciona una opción</option>
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>
                                    {index + 1} vuelta/s
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.cantidad_vueltas} className='mt-2'/>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton className="ml-2" disabled={processing}>
                            Crear
                        </PrimaryButton>
                        <SecondaryButton className='hover:bg-red-400 ml-2' onClick={closeGenerarFixtureModal}>
                            CANCELAR
                        </SecondaryButton>
                        </div>
                </form>
            ) : (
                <>
                        <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white dark:text-white">
                                    No hay equipos suficientes!
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                                    Debe tener al menos dos equipos para generar un fixture.
                                </p>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <PrimaryButton className='hover:bg-red-400' onClick={closeGenerarFixtureModal}>Cerrar</PrimaryButton>
                        </div>
                </>
            ))}
               
        </div>
        {isModalConfirmacionFixture && (<ModalConfirmacionBorrar confirmar={confirmarGenerarFixture} closeModalGenerarFixture={closeGenerarFixtureModal} closeModalConfirmacionFixture={closeModalConfirmacionFixture}/>)}
    </div>
    </>
        )
}
export default ModalGenerarFixture;