import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({auth}){

    return (
        <>
        <Head title="Ballers League">   
        </Head>
        {auth ? (
            <AuthenticatedLayout user={auth}>
                    
            </AuthenticatedLayout>
        ) : (
            <GuestLayout>
                <main className='w-full'>
                    <div className='w-full flex justify-center'>
                            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/images/TPFL.png" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Crear ligas</h5>
                                    <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">
                                        <span className='text-black font-bold'> Ballers</span> <span className='text-orange-500 font-bold'>League </span>
                                        llego para llevar tu liga al siguiente nivel, crea y administra tu liga de manera simple.
                                    </p>
                                </div>
                            </a>
                            <a href="#" className="flex flex-col items-center ml-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/images/TPFL.png" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Informacion y notificaciones</h5>
                                    <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">
                                        <span className='text-black font-bold'> Ballers</span> <span className='text-orange-500 font-bold'>League </span>
                                        te permite seguir e informarte sobre las mejores ligas amateur.
                                    </p>
                                </div>
                            </a>
                            
                    </div>
                    <div className='w-full flex justify-center mt-10 h-52'>
                            <a href="#" className="flex items-center ml-10 bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/images/TPFL.png" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Estadisticas</h5>
                                    <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">
                                        <span className='text-black font-bold'> Ballers</span> <span className='text-orange-500 font-bold'>League </span>
                                        te permite ver estadisticas por liga y jugadores.
                                    </p>
                                </div>
                            </a>
                    </div>
                </main>
            </GuestLayout>
        )}
        
        </>
    )
}