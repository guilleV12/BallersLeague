import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    return (
        <>
        <div className="relative sm:flex min-h-screen bg-gray-200">
            <NavBar auth={false}/>  
                <main className='sm:flex sm:justify-center sm:items-center w-full pt-[13%] md:pt-[10%]'>
                    {children}
                </main>
        </div>
        <Footer/>
        </>
    );
}
