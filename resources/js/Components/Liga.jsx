import dayjs from 'dayjs'
import React, { useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import PrimaryButton from './PrimaryButton'
import Dropdown from './Dropdown'
import InputError from './InputError'
import { useForm, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import NavLink from './NavLink'

dayjs.extend(relativeTime)
export const Liga = ({liga}) => {
    const {auth} = usePage().props;
    const [editing, setEditing] = useState(false);
    const {data, setData, patch, processing, reset, error} = useForm({
        name: liga.name,
        body: liga.body
    })

  return (
    <div className='p-5 flex space-x-2'>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
        </svg>
        <div className='flex-1'>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='text-gray-800'>
                        {liga.user.name}
                    </span>
                    <small className='ml-2 text-sm text-gray-600'>
                        {dayjs(liga.created_at).fromNow()}
                    </small>
                </div>
            </div>
            <p className='mt-4 text-lg text-white'>{liga.name}</p>
            <p className='mt-4 text-white'>{liga.body}</p>
            <NavLink href={route('ligas.liga', liga.id)}>
                 <PrimaryButton
                className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-r'
                disabled={processing}
                children={'Entrar'}
                >
                </PrimaryButton>           
            </NavLink>
        </div>
    </div>
  )
}