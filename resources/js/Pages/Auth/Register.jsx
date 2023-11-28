import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import DateInput from '@/Components/DateInput';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        email: '',
        fecha_nacimiento: '',
        dni: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    return (
        <GuestLayout>
            <Head title="Register" />
            <main className='flex justify-center w-full h-fit'>
            <form onSubmit={submit} className='bg-white w-fit xl:w-[20%] h-fit border border-black px-5 py-5 rounded-lg shadow-lg shadow-gray-500'>
                <div className='flex w-full justify-center'>
                    <ApplicationLogo className='w-60' texto={true}/>
                </div>
                <div>
                    <InputLabel htmlFor="nombre" value="Nombre" className="text-xs"/>

                    <TextInput
                        id="nombre"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full"
                        autoComplete="nombre"
                        isFocused={true}
                        onChange={(e) => setData('nombre', e.target.value)}
                        icon={<ion-icon name="person"></ion-icon>}
                    />

                    <InputError message={errors.nombre} className="mt-2" />
                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="apellido" value="Apellido" className="text-xs"/>

                    <TextInput
                        id="apellido"
                        name="apellido"
                        value={data.apellido}
                        className="mt-1 block w-full"
                        autoComplete="apellido"
                        onChange={(e) => setData('apellido', e.target.value)}
                        icon={<ion-icon name="person"></ion-icon>}
                    />

                    <InputError message={errors.apellido} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-xs"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        icon={<ion-icon name="at-circle-outline"></ion-icon>}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fecha_nacimiento" value="Fecha de nacimiento" className="text-xs"/>

                    <DateInput  
                       id="fecha_nacimiento"
                       name="fecha_nacimiento"
                       max={date}
                       value={data.fecha_nacimiento}
                       className="mt-1 block w-full"
                       autoComplete="fecha_nacimiento"
                       onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                    />

                    <InputError message={errors.fecha_nacimiento} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="dni" value="Dni" className="text-xs"/>

                    <TextInput
                        id="dni"
                        name="dni"
                        value={data.dni}
                        className="mt-1 block w-full"
                        autoComplete="dni"
                        onChange={(e) => setData('dni', e.target.value)}
                        icon={<ion-icon name="document-text"></ion-icon>}
                    />

                    <InputError message={errors.dni} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-xs"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        icon={<ion-icon name="lock-closed"></ion-icon>}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar password" className="text-xs"/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        icon={<ion-icon name="lock-closed"></ion-icon>}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Ya tiene una cuenta?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
            </main>
        </GuestLayout>
    );
}
