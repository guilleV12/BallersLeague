import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';
import NavBar from '@/Components/Partials/NavBar';
import Footer from '@/Components/Partials/Footer';
import SideBar from '@/Components/Partials/SideBar';

export default function Guest({ children }) {
    return (
        <>
        <Head>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </Head>
        <div className="bg-gray-50 dark:bg-slate-900">
            <NavBar auth={false}/>
            <SideBar auth={false}/>  
                <main className='sm:flex sm:justify-center sm:items-center w-full min-h-screen'>
                    {children}
                </main>
        </div>
        <Footer/>
        <script src="./node_modules/preline/dist/preline.js"></script>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
