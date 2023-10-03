import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeContent from '@/Components/Home/HomeContent';
import React,{ useState } from 'react';

export default function Home({ auth, liga, miLiga }){

    return (
        <>
        <Head title="Ballers League"/>   
        {auth ? (
            <AuthenticatedLayout user={auth} liga={liga} miLiga={miLiga}>
                <main className='w-full'>
                    <HomeContent/>
                </main>
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                <main className='w-full'>
                    <HomeContent/>
                </main>
            </GuestLayout>
        )}
        
        </>
    )
}