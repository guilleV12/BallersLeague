import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({auth}){

    return (
        <>
        <Head title="Ballers League">
                        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js">
                        </script>
                        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js">
                        </script>
        </Head>
        {auth ? (
            <AuthenticatedLayout user={auth}>
                    a
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                
            </GuestLayout>
        )}
        
        </>
    )
}