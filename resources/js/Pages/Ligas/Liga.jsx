import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head } from '@inertiajs/react'
import { Liga } from '@/Components/Liga'

const MiLiga = ({auth, user, ligas}) => {
  console.log(ligas);
  return (
    <>
    <Head title="Ligas">
                        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js">
                        </script>
                        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js">
                        </script>
    </Head>
    <AuthenticatedLayout 
        auth={auth}
        user={user}
        children={
        <div className='max-w-2xl mx-auto p-4  sm:p-6 lg:p-8'>
            <div className='mt-6 bg-indigo-400 rounded-lg divide-y-4'>
                
            </div>
        </div>
        }>
    </AuthenticatedLayout>
    </>
  )
}

export default MiLiga