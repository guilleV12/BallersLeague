import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesion" />
            <main className='flex justify-center w-full lg:pl-[13rem]'>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className='bg-white w-[90%] md:w-fit border border-black px-10 py-5 rounded-lg shadow-lg shadow-gray-500'>
                <div className='flex justify-center'>
                    <ApplicationLogo className='m-0 pl-2 w-60' texto={true}/>
                </div>
                
                <div>
                    <InputLabel htmlFor="email" value="Email" className='text-xs'/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        icon={<ion-icon name="at-circle-outline"></ion-icon>}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className='text-xs'/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        icon={<ion-icon name="lock-closed"></ion-icon>}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-xs text-gray-600">Recordarme</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Olvidaste tu password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Iniciar sesion
                    </PrimaryButton>
                </div>
            </form>
            </main>
        </GuestLayout>
    );
}
