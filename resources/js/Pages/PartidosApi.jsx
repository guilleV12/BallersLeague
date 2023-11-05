import TablaApi from '@/Components/ContenidoApis/TablaApi';
import TablaPaginadaApi from '@/Components/ContenidoApis/TablaPaginadaApi';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import React from 'react'

export const PartidosApi = ({
    partidos, 
    auth, 
    liga, 
    miLiga
}) => {
  return (
    <>
        <Head title="Ballers League"/>   
        {auth ? (
            <AuthenticatedLayout user={auth} liga={liga} miLiga={miLiga}>
                <main className='grid grid-cols-1 justify-center  w-[80%] h-fit lg:ml-[15.5rem] xl:ml-[18rem] border border-rounded-lg'>
                    <div className='flex justify-center border border-white border-rounded-lg h-20 bg-black text-white items-center text-xl font-bold'>
                        Resutlados Clausura 2023
                    </div>
                    <div className=''>
                        <TablaPaginadaApi
                            partidos={partidos.data}
                            />
                    </div>
                </main>
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                <main className='flex justify-center w-full lg:w-3/4 h-fit  lg:ml-[15.5rem] xl:ml-[18rem]'>
                </main>
            </GuestLayout>
        )}
        
    </>
  )
}
export default PartidosApi;