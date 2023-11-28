import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ApplicationLogo from "../ApplicationLogo";
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from "../PrimaryButton";
import BreadCrumb from "../BreadCrumb";

const NavBar = ({auth, toggleSidebar, notificaciones}) => {

    return (
       
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full 
        bg-white border-b text-sm py-2.5 sm:py-0.5 dark:bg-gray-800 dark:border-gray-700">
            <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
                <div className="flex justify-start items-center ">
                    <div className="px-5">
                        <button
                            onClick={toggleSidebar}
                            alt='Paginas y menu'
                            title="Paginas y menu"
                            className="w-10 flex justify-center items-center h-10 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                        >
                            <span className="flex justify-center items-center text-3xl">
                                <ion-icon name="menu"></ion-icon>
                            </span>
                        </button>
                    </div>
                    <a className="w-28 flex justify-start text-xl font-semibold dark:text-white" href='/' aria-label="Ballers League">
                        <ApplicationLogo texto={true}/>
                    </a>
                    
                </div>
                <div className="">
                    <div className="text-sm items-center py-4 ">
                        <Router>
                                <BreadCrumb/>
                        </Router>
                    </div>
                </div>
             
        
                <div className="w-full flex items-center justify-between ml-auto sm:justify-between sm:gap-x-3 sm:order-3 pr-5">
                    {auth ? (
                        <div className="ml-auto flex items-center gap-x-3">
                            <span className="text-sm font-semibold hidden sm:flex">{auth.nombre+' '+auth.apellido}</span>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" alt='Notificaciones' title="Notificaciones" className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                                        <span className="flex justify-center items-center text-3xl ">
                                            <ion-icon name="notifications-circle-outline"/>
                                        </span>
                                        {(notificaciones)&&(
                                            notificaciones[3] !== 0 && (
                                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">!</span>
                                        ))}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content width="w-96">
                                    {notificaciones&&(
                                        <ul className="grid">
                                        {
                                            notificaciones.map((notificacion, index)=> (//mapea los tres tipos de notificaciones
                                            (index !== 3)&&(
                                                <li key={index} className=" justify-center border-b border-gray">
                                                    {//PROXIMOS PARTIDOS
                                                    (index === 0 && notificacion.length>0)&&(<PrimaryButton disabled={true} className="w-full justify-center mb-2">Proximos partidos</PrimaryButton>)}
                                                    <ul className="text-xs mb-2">{
                                                        
                                                        notificacion.map((objNotificacion)=>(//mapea dentro de cada una de las tres tipos de notificacion
                                                            (index === 0)&&(
                                                                <li key={objNotificacion.fecha.id} className="">
                                                                    <a className="text-orange-500 font-semibold" href={route('ligas.show',objNotificacion.liga.user_id)}>
                                                                        {objNotificacion.liga.nombre}
                                                                    </a>
                                                                    {' | '+objNotificacion.fecha.fecha+' '+objNotificacion.fecha.horario+' | '+objNotificacion.equipo_1+' vs '+objNotificacion.equipo_2}
                                                                </li>
                                                            )
                                                        ))
                                                    }   
                                                    </ul>

                                                    {//RESULTADOS
                                                    (index === 1 && notificacion.length>0)&&(<PrimaryButton disabled={true} className="w-full justify-center mb-2">Resultados Recientes</PrimaryButton>)}
                                                    <ul className="text-xs">{
                                                        notificacion.map((objNotificacion)=>(
                                                            (index === 1 )&&(
                                                                <li key={objNotificacion.partido.id}>
                                                                    <a className="text-orange-500 font-semibold" href={route('ligas.show',objNotificacion.liga.id)}>
                                                                        {objNotificacion.liga.nombre}
                                                                    </a>
                                                                    {' | '+objNotificacion.fecha.fecha+' '+objNotificacion.fecha.horario+' | '+objNotificacion.equipo_1+' '+objNotificacion.partido.puntaje_equipo_1+' vs '+objNotificacion.partido.puntaje_equipo_2+' '+objNotificacion.equipo_2}

                                                                </li>
                                                            )
                                                        ))
                                                    }
                                                    </ul>

                                                    {//INVITACION ARBITRO
                                                    (index === 2 && notificacion.length>0)&&(<PrimaryButton disabled={true} className="w-full justify-center mb-2">Invitacion de arbitraje</PrimaryButton>)}
                                                    <ul className="text-xs" key={index+1}>{
                                                        notificacion.map((objNotificacion)=>(
                                                            (index === 2 )&&(
                                                                <li key={objNotificacion.invitacion.id}>
                                                                    Has sido invitado a arbitrar en la liga: <a className="text-orange-500 font-semibold" href={route('ligas.show',objNotificacion.liga.id)}>{objNotificacion.liga.nombre}</a>!

                                                                </li>
                                                            )
                                                        ))
                                                    }
                                                    </ul>
                                                </li>
                                            )
                                            ))
                                        }
                                        </ul>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                            
                
                            <div className="ml-auto flex items-center gap-x-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" alt='Perfil' title="Perfil" className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                                            <span className="flex justify-center items-center text-3xl ">
                                                <ion-icon name="person-circle"></ion-icon>
                                            </span>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link className="flex sm:hidden" >
                                            <PrimaryButton className="flex justify-center bg-black hover:text-white w-full h-full" disabled={true}>{auth.nombre+' '+auth.apellido}</PrimaryButton>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <PrimaryButton className="flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white w-full h-full">Perfil</PrimaryButton>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method='post'>
                                            <PrimaryButton className="flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white w-full h-full">Cerrar sesion</PrimaryButton>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-x-3 px-3">
                            <a alt="Iniciar sesion" title="Iniciar sesion" className="inline-flex justify-center items-center py-1 w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800" href={route('login')}>
                                <span className='flex justify-center items-center text-2xl'>
                                    <ion-icon name="log-in"></ion-icon>
                                </span>        
                            </a>
                            <a alt='Registrarse' title="Registrarse" className=" inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800" href={route('register')}>
                                <span className='flex justify-center items-center text-2xl'>
                                    <ion-icon name="person-add"></ion-icon>                                
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