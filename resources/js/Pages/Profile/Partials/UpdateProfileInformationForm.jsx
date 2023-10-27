import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import Alert from '@/Components/Alerts/Alert';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'),{
            onSuccess: () => {setShowAlert(true)},
        });
    };

    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informacion de perfil</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualizar informacion de perfil.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nombre" value="Nombre" className='text-xs'/>

                    <TextInput
                        id="nombre"
                        className="mt-1 block w-full"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        required
                        isFocused
                        autoComplete="nombre"
                        icon={<ion-icon name="person"></ion-icon>}
                    />

                    <InputError className="mt-2" message={errors.nombre} />
                </div>

                <div>
                    <InputLabel htmlFor="apellido" value="Apellido" className='text-xs'/>

                    <TextInput
                        id="apellido"
                        className="mt-1 block w-full"
                        value={data.apellido}
                        onChange={(e) => setData('apellido', e.target.value)}
                        required
                        autoComplete="apellido"
                        icon={<ion-icon name="person"></ion-icon>}
                    />

                    <InputError className="mt-2" message={errors.apellido} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className='text-xs'/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        icon={<ion-icon name="at-circle-outline"></ion-icon>}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                {showAlert &&(<Alert titulo={'Perfil actualizado con exito!'} texto={''} tiempo={3000} icono={'success'} showAlert={showAlert} closeAlert={closeAlert}/>)}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
