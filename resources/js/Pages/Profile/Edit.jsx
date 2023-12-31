import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, miLiga, notificaciones, cantNotiUser }) {
    return (
        <AuthenticatedLayout
            cantNotiUser={cantNotiUser}
            user={auth.user} miLiga={miLiga} notificaciones={notificaciones}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            classMain={' flex justify-center w-full h-fit px-20'}
        >
            <Head title="Perfil" />
                <div className='w-full flex flex-col justify-center'>
                    <div className="px-10 py-5 border border-black bg-white shadow-lg shadow-gray-500 rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className=""
                        />
                    </div>

                    <div className="px-10 py-5 border border-black bg-white shadow-lg shadow-gray-500 rounded-lg mt-5">
                        <UpdatePasswordForm className="" />
                    </div>

                    <div className="px-10 py-5 border border-black bg-white shadow-lg shadow-gray-500 rounded-lg mt-5">
                        <DeleteUserForm className="" />
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
