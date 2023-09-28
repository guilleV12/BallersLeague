import React from 'react'
import BreadCrumb from '../BreadCrumb';
import ResponsiveToggleSB from '../ResponsiveToggleSB';
import ApplicationLogo from '../ApplicationLogo';
import Dropdown from '../Dropdown';
import PrimaryButton from '../PrimaryButton';

export const SideBar = ({auth}) => {
    return (
        <>
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center py-4">
                <ResponsiveToggleSB/>
                <BreadCrumb/>
            </div>
        </div>

        <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden 
        fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 
        lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand"><ApplicationLogo texto={true}/></a>
            </div>

            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
                {/*=== Opcion 1 ===*/}
                <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 font-bold rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white" href="/" >
                        <span className='text-2xl flex text-orange-500'>
                            <ion-icon name="home"/>
                            <p className='text-lg text-slate-700 ml-3'>Home</p>
                        </span>
                </a>
                </li>
                {/*=== Cierre Opcion 1 ===*/}
                {/*=== Opcion 2 ===*/}
                <li className="hs-accordion" id="users-accordion">
                    {auth ? (
                        <Dropdown>
                        <Dropdown.Trigger>
                                <a className="hs-accordion-toggle flex justify-between items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent font-bold  rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="#">
                                    <span className='text-2xl flex text-orange-500'>
                                        <ion-icon name="basketball"/>
                                        <p className='text-lg text-slate-700 ml-3'>Ligas</p>
                                    </span>        
                                    <ion-icon name="caret-down-outline"/>
                                </a>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('ligas.index')}>
                                <PrimaryButton className='flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full'>Ver todas</PrimaryButton>
                            </Dropdown.Link>
                            <Dropdown.Link href={route('ligas.show',[auth.id])}>
                                <PrimaryButton className='flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full'>Mi liga</PrimaryButton>
                            </Dropdown.Link>
                            <Dropdown.Link href={route('ligas.create')}>
                                <PrimaryButton className='flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full'>Crear liga</PrimaryButton>
                            </Dropdown.Link>
                            
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