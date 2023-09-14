import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';
import SideBar from '@/Components/SideBar';

export default function Authenticated({ user, children}) {

    return (
        <>
        <div className="relative sm:flex min-h-screen bg-gray-200">
            <NavBar auth={user}/>
            <SideBar/>
                <main className='flex justify-center items-center w-full pt-[13%] md:pt-[10%]'>
                    {children}
                </main>
        </div>
        <Footer/>
        </>
    );
}
