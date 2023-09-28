import { Head } from '@inertiajs/react'
import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'


export const Invitacion = () => {
  return (
    <>
        <Head title='Invitacion de arbitraje'></Head>
        <AuthenticatedLayout user={user} classMain={''}>
            <div className='flex justify-center w-2/3 bg-white border border-gray-200 rounded-lg shadow my-5'>            
                
            </div>
        </AuthenticatedLayout>
    </>
  )
}

export default Invitacion;