import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import NavBar from '@/Components/Partials/NavBar';
import Footer from '@/Components/Partials/Footer';
import SideBar from '@/Components/Partials/SideBar';

export default function Authenticated({ user, children, classMain, miLiga, notificaciones}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };

    return (
        <>
        <Head>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </Head>
       <div className="bg-gray-100 dark:bg-slate-900">
            <NavBar auth={user} toggleSidebar={toggleSidebar} notificaciones={notificaciones}/>
            <SideBar auth={user} miLiga={miLiga} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>  
                <main className={'w-full h-fit lg:min-h-screen py-10 '+classMain}>
                    {children}
                </main>
        </div>
        <Footer/>
        <script src="./node_modules/preline/dist/preline.js"></script>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
