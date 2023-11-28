import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeContent from '@/Components/Home/HomeContent';
import React,{ useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Home({ auth, liga, miLiga, notificaciones, cantNotiUser }){
    return (
        <>
        <Head title="Ballers League"/>   
        {auth ? (
            <AuthenticatedLayout user={auth} liga={liga} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
                <main className='flex justify-center w-full h-fit px-5 md:px-20'>
                <div className='grid w-full lg:w-3/4 justify-center'>
                        <div className='flex space-x-2'>
                            <a alt='Ver todas las ligas' title='Ver todas las ligas' href={route('ligas.index')}>
                                <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Ver ligas</PrimaryButton>
                            </a>
                            {auth &&(
                                (miLiga.length>0) ? (
                                    <a href={route('ligas.show',[auth.id])} alt='Ir a mi liga' title='Ir a mi liga'>
                                        <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Mi liga</PrimaryButton>
                                    </a>
                                ) : (
                                    <a href={route('ligas.create')} alt='Crear liga' title='Crear liga'>
                                        <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Crear liga</PrimaryButton>
                                    </a>
                                )
                            )}
                        </div>
                        <HomeContent/>
                </div>
                </main>
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                <main className='flex justify-center w-full h-fit px-5 md:px-20'>
                    <div className='grid w-full lg:w-3/4 justify-center'>
                        <div className='flex space-x-2'>
                            <a alt='Ver todas las ligas' title='Ver todas las ligas' href={route('ligas.index')}>
                                <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Ver ligas</PrimaryButton>
                            </a>
                            {auth &&(
                                (miLiga.length>0) ? (
                                    <a href={route('ligas.show',[auth.id])} alt='Ir a mi liga' title='Ir a mi liga'>
                                        <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Mi liga</PrimaryButton>
                                    </a>
                                ) : (
                                    <a href={route('ligas.create')} alt='Crear liga' title='Crear liga'>
                                        <PrimaryButton className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Crear liga</PrimaryButton>
                                    </a>
                                )
                            )}
                        </div>
                        <HomeContent/>
                    </div>
                </main>
            </GuestLayout>
        )}
        
        </>
    )
}