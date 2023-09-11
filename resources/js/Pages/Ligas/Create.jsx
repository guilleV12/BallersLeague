import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head } from '@inertiajs/react'

const Create = ({auth, user}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        body: ''
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('ligas.store'), {onSuccess: ()=> reset() })
    }

  return (
    <AuthenticatedLayout 
        auth={auth}
        user={user}
    >
        <Head title='Ligas'/>
        <div className='max-w-2xl mx-auto p-4  sm:p-6 lg:p-8'>
            <form onSubmit={submit}>
                <input
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    type='text'
                    placeholder='Nombre de liga'
                    autoFocus
                    className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-300 focus-ring-opacity-50 rounded-md shadow-sm'
                />
                <InputError message={errors.name}/>

                <textarea
                    value={data.body}
                    onChange={e => setData('body', e.target.value)}
                    type='text'
                    placeholder='Descripcion'
                    className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-300 focus-ring-opacity-50 rounded-md shadow-sm'
                >

                </textarea>
                <InputError message={errors.name}/>

                <PrimaryButton 
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-r'
                    disabled={processing}
                    children={'Crear'}
                >
                </PrimaryButton>
            </form>
        </div>
    </AuthenticatedLayout>
  )
}

export default Create