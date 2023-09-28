import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TablaPaginada from '@/Components/Liga/TablaPaginada'
import { Head } from '@inertiajs/react'
import { CardCrear } from '@/Components/CardCrear'


const Index = ({ user, ligas, success, users }) => {

  return (
    <>
    <Head title="Ligas"/>
    <AuthenticatedLayout user={user} classMain={(ligas.length == 0) ? `bg-black` : ``}>
        <div className='flex justify-center w-2/3'>
            {success ? (
              <CardCrear children={success}/>
            ):(
              ''
            )}
            <TablaPaginada data={ligas} user={user} users={users} className=' w-[70%]'/>          
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index