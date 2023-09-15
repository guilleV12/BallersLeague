import React, { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Link, Head } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from "./PrimaryButton";

const NavBar = ({auth}) => {
    let [open, setOpen] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <header className="shadow-md w-full fixed top-0 left-0 border-b-2 z-[2]">
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <Link href='/' className="flex items-center" alt="Inicio Ballers League" title="Ir a Inicio">
                    <ApplicationLogo className="h-20 w-auto" texto={true}></ApplicationLogo>
                    <h1 className="hidden font-bold text-2xl md:flex items-center text-black">
                        Ballers League
                    </h1>
                </Link>
                <div onClick={()=>setOpen(!open)}
                    className={`text-3xl absolute right-8 top-6 cursor-pointer md:hidden`}>
                    <ion-icon name={open ? 'close' : auth ? 'person-circle-outline' : 'menu-outline'}></ion-icon>
                </div>
                {auth ? (
                        <ul className={`md:flex md:items-center absolute md:static bg-white md:z-auto z-[-1]
                        left-0 w-full md:w-auto px-9 md:px-0 md:pb-0 pb-5 transition-all duration-500 ease-in
                        ${open ? 'top-[100%] opacity-100' : 'top-[-490px]'} md:opacity-100 opacity-0`}>
                            <li className="md:ml-2 ml-1  md:my-0 my-1">
                                <Link href={route('profile.edit')} alt="Perfil" title="Ir al perfil">
                                    <PrimaryButton className="py-3 md:w-auto w-full rounded-xl">
                                        <span className="text-2xl text-white">
                                            <ion-icon name='person-outline'></ion-icon>
                                        </span>
                                    </PrimaryButton>
                                </Link>
                            </li>
                            <li className="md:ml-2 ml-1 md:my-0 my-1">
                                <Link href={route('logout')} method="post" alt="Cerrar sesion" title="Cerrar sesion">
                                    <PrimaryButton className="py-3 md:w-auto w-full bg-red-500 rounded-xl">
                                        <span className="text-2xl text-white">
                                        <ion-icon name='exit-outline'></ion-icon>
                                        </span>
                                    </PrimaryButton>
                                </Link>
                            </li>
                        </ul>
                            
                    ) : (
                        <ul className={`md:flex md:items-center absolute md:static bg-white md:z-auto z-[-1]
                                left-0 w-full md:w-auto px-9 md:px-0 md:pb-0 pb-5 transition-all duration-500 ease-in
                                ${open ? 'top-[100%] opacity-100' : 'top-[-490px]'} md:opacity-100 opacity-0`}>
                        <li className="md:ml-2 ml-1 md:my-0 my-1">
                            <Link href={route('ligas.index')} alt="ver ligas" title=" Ir a todas las ligas">
                                <PrimaryButton className="py-4 md:w-auto w-full">
                                    Ligas
                                </PrimaryButton>
                            </Link>
                        </li>
                        <li className="md:ml-2 ml-1  md:my-0 my-1">
                            <Link href={route('login')} alt="Iniciar sesion" title=" Ir a iniciar sesion">
                                <PrimaryButton className="py-4 md:w-auto w-full">
                                    Iniciar sesion
                                </PrimaryButton>
                            </Link>
                        </li>
                        <li className="md:ml-2 ml-1 md:my-0 my-1">
                            <Link href={route('register')} alt="registrarse" title=" Ir a registrarse">
                                <PrimaryButton className="py-4 md:w-auto w-full">
                                    Registrarse
                                </PrimaryButton>
                            </Link>
                        </li>
                    </ul>
                        
                    )
                }
            </div>
        </header>
    )
}

export default NavBar