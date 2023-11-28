import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Alert from '@/Components/Alerts/Alert';
import { useState } from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [isOpenAlert, setOpenAlert] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar password" />
            <div className='w-full grid justify-center'>
                <div className="mb-4 text-sm text-gray-600 w-full px-5 md:px-0">
                    Olvido su password? No hay problema. Ingrese su email y le enviaremos un link para reiniciar su password.
                </div>

                <form onSubmit={submit} className='w-full px-5 md:px-0'>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Enviar email
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
