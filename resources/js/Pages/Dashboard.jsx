import CardInfo from '@/Components/CardInfo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, miLiga }) {
    return (
        <AuthenticatedLayout user={auth.user} miLiga={miLiga}>
            <Head title="Bienvenido" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ml-[10%]">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <CardInfo tipo={'bienvenido'} user={auth.user}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
