import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head } from '@inertiajs/react'
import { Liga } from '@/Components/Liga'

const Show = ({auth, user, ligas}) => {

  return (
    <AuthenticatedLayout 
        auth={auth}
        user={user}
    >
        <Head title='Ligas'/>
        <div className='max-w-2xl mx-auto p-4  sm:p-6 lg:p-8'>
            <div className='mt-6 bg-indigo-400 rounded-lg divide-y-4'>
                {
                    ligas.map( liga =>
                        <Liga key={liga.id} liga={liga}/>
                        )
                }
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Show