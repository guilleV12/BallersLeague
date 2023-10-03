import React, { useState } from "react";
import ApplicationLogo from "../ApplicationLogo";
import { Link, Head } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from "../PrimaryButton";

const NavBar = ({auth}) => {
    let [open, setOpen] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
       
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full 
        bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700">
            <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
                <div className="mr-5 lg:mr-0 lg:hidden">
                    <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Ballers League">
                        <ApplicationLogo texto={true}/>
                    </a>
                </div>
        
                <div className="w-full flex items-center justify-between ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
                    {auth ? (
                        <div className="ml-auto flex items-center gap-x-3">
                            <span>{auth.nombre+' '+auth.apellido}</span>
                            <button type="button" className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full
                            font-medium ">
                                <span className="text-4xl">
                                    <ion-icon name="notifications-circle-outline"/>
                                </span>
                            </button>
                
                            <div className="ml-auto flex items-center gap-x-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full
                                        font-medium ">
                                            <span className="text-4xl">
                                                <ion-icon name="person-circle"></ion-icon>
                                            </span>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <PrimaryButton className="flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full">Perfil</PrimaryButton>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method='post'>
                                            <PrimaryButton className="flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full">Cerrar sesion</PrimaryButton>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-x-3">
                            <a className="hs-accordion-toggle flex justify-between items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent font-bold  rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href={route('login')}>
                                <span className='text-3xl flex text-black'>
                                    <ion-icon name="log-in-outline"></ion-icon>
                                </span>        
                            </a>
                            <a className="hs-accordion-toggle flex justify-between items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent font-bold  rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href={route('register')}>
                                <span className='text-3xl flex text-black'>
                                    <ion-icon name="person-add-outline"></ion-icon>                                
                                </span>        
                            </a>
                        </div>
                    )}  
                </div>
            </nav>
      </header>
    )
}

export default NavBar