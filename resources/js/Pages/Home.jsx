import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeContent from '@/Components/Home/HomeContent';
import React,{ useState } from 'react';

export default function Home({ auth, liga, miLiga, notificaciones, cantNotiUser }){

    return (
        <>
        <Head title="Ballers League"/>   
        {auth ? (
            <AuthenticatedLayout user={auth} liga={liga} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
                <main className='flex justify-center  w-full lg:w-3/4 h-fit lg:ml-[15.5rem] xl:ml-[18rem]'>
                    <HomeContent/>
                </main>
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                <main className='flex justify-center w-full lg:w-3/4 h-fit  lg:ml-[15.5rem] xl:ml-[18rem]'>
                    <HomeContent/>
                </main>
            </GuestLayout>
        )}
        
        </>
    )
}