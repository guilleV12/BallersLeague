import { Link } from '@inertiajs/react';
import React from 'react'

export const SideBar = () => {
    //pasar links a array cuando sean mas
  return (
        <>
        <div className="w-72 bg-white rounded-sm h-min-screen md:pt-[8%] lg:pt-[8%] xl:pt-[7%]">
            <ul className="pl-2 pt-5 fixed lg:w-[15%] xl:w-[12%]">
            <li>
                <Link to={'/'} className='items-center flex gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md'>
                <span className='text-orange-500 text-3xl'>
                    <ion-icon name="home"/>
                </span>
                Home
                </Link>
            </li>
            <li>
                <a href={route('ligas.index')} className='flex items-center gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md'>
                <span className='text-orange-500 text-3xl'>
                    <ion-icon name="basketball"/>
                </span>
                Ligas
                </a>
            </li>
            </ul>
        </div>
   </>
  )
}

export default SideBar;