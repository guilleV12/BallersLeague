import React from 'react'

export const CardLiga = ({ path, liga, className }) => {
  return (
    (liga.nombre) ? (
        <div className={`w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
            <div className="flex flex-col items-center justify-center pb-10">
                <img className="h-52 w-auto my-5 rounded-full shadow-xl" src={'/images/'+path}  alt={`Liga `+liga.nombre}/>
                <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{liga.nombre}</h5>
                <span className="text-md text-gray-500 dark:text-gray-400">Descripcion: {liga.descripcion}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href={route('ligas.show',[liga.user_id])} className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-orange-500 rounded-lg 
                    hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 
                    dark:focus:ring-orange-500">Ver liga</a>
                </div>
            </div>
        </div>
        ) : (        
            
        <section className='bg-center bg-cover bg-no-repeat bg-[url(https://cdn.wallpapersafari.com/47/11/H0USDg.jpg)]'>
            <div className="lg:px-10 px-4 mx-auto lg:max-w-screen-md xl:max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Aun no hay ligas registradas.</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"><span className='text-orange-500'>Ballers</span> League,
                 lleva tu liga al siguiente nivel.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href={route('ligas.create')} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-bold text-white rounded-lg bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-900">
                        Crear liga
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                     
                </div>
            </div>
        </section>
        )
  )
}
