import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import CardJugadores from '@/Components/Jugador/CardJugadores';


const Index = ({ user, liga, jugadores, equipo }) => {
console.log(equipo.nombre);
  return (
    <>
    <Head title={`Jugadores ${equipo.nombre}`}/>
    <AuthenticatedLayout user={user} classMain={(liga.length == 0) ? `bg-black` : ``}>
        <div className='flex justify-center w-2/3 bg-white border border-gray-200 rounded-lg shadow my-5'>            
            <CardJugadores user={user} liga={liga} equipo={equipo} jugadores={jugadores}></CardJugadores>
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index