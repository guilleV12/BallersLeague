import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { CardLigaShow } from '@/Components/Liga/CardLigaShow'
import { CardCrear } from '@/Components/CardCrear'

const Show = ({ auth, user, liga, equipos, userAdmin, arbitros, success, users={users} }) => {
  return (
    <AuthenticatedLayout auth={auth} user={user}>
        <Head title='Ligas'/>
        <div className='w-full flex justify-center'>
            <div className='w-2/3 min-h-screen my-5 rounded-lg flex justify-center'>
                {
                 <CardLigaShow liga={liga[0]} user={user} equipos={equipos} userAdmin={userAdmin[0]} arbitros={arbitros} users={users}></CardLigaShow>
                }
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Show