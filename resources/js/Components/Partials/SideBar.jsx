import React, { useState } from 'react'
import BreadCrumb from '../BreadCrumb';
import ResponsiveToggleSB from '../ResponsiveToggleSB';
import ApplicationLogo from '../ApplicationLogo';
import Dropdown from '../Dropdown';
import PrimaryButton from '../PrimaryButton';

export const SideBar = ({ auth, miLiga, isSidebarOpen, toggleSidebar }) => {
console.log(isSidebarOpen);
    return (
        <>
        {isSidebarOpen &&(
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-50 lg:hidden"></div>        
        )}

        <div className={`transition-all duration-300 transform fixed top-0 left-0 bottom-0 z-[60] w-52 bg-gray-300 border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y translate-x-0 right-auto dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>

                <div className="flex justify-center items-center w-full lg:px-6">
                    <div className="px-6 lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className=" w-10 flex justify-center items-center h-10 text-black hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                        >
                            <span className="flex justify-center items-center text-3xl">
                                <ion-icon name="menu"></ion-icon>
                            </span>
                        </button>
                    </div>
                    <a className="w-full flex justify-center text-xl font-semibold dark:text-white" href="#" aria-label="Ballers League">
                        <ApplicationLogo texto={true}/>
                    </a>
                    
                </div>

            <nav className=" p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
                {/*=== Opcion 1 ===*/}
                <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 font-bold rounded-md text-black hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800" href="/" >
                        <span className='text-lg flex items-center '>
                            <ion-icon name="home"/>
                            <p className='text-base ml-3'>Home</p>
                        </span>
                </a>
                </li>
                {/*=== Cierre Opcion 1 ===*/}
                {/*=== Opcion 2 ===*/}
                <li>
                    {auth ? (
                        <Dropdown>
                        <Dropdown.Trigger>
                                <a className="flex justify-between items-center gap-x-1.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent font-bold  rounded-md text-black hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800" href="#">
                                    <span className='text-lg flex items-center'>
                                        <ion-icon name="basketball"/>
                                        <p className='text-base ml-3'>Ligas</p>
                                    </span>        
                                    <ion-icon name="caret-down-outline"/>
                                </a>
                        </Dropdown.Trigger>
                        <Dropdown.Content  width='42'>
                            <Dropdown.Link href={route('ligas.index')}>
                                <PrimaryButton className='flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white w-full h-full'>Ver todas</PrimaryButton>
                            </Dropdown.Link>
                                {(miLiga[0]) ? (
                                    <Dropdown.Link href={route('ligas.show',[auth.id])}>
                                        <PrimaryButton className='flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white w-full h-full'>Mi liga</PrimaryButton>
                                    </Dropdown.Link>
                                ) : (
                                    <Dropdown.Link href={route('ligas.create')}>
                                        <PrimaryButton className='flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white w-full h-full'>Crear liga</PrimaryButton>
                                    </Dropdown.Link>
                                )}
                            
                        </Dropdown.Content>
                    </Dropdown>
                    ) : (
                        ''
                    )}
                    
                </li>
                
            </ul>
            </nav>
            
        </div>
   </>
  )
}

export default SideBar;