import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import TabJugadores from '@/Components/Jugador/TabJugadores';
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion';

const Index = ({ user, liga, jugadores, equipo, miLiga, notificaciones, cantNotiUser, patrocinadores }) => {
  return (
    <>
    <Head 
      title={`Jugadores ${equipo.nombre}`}
      />
    <AuthenticatedLayout 
      user={user} 
      liga={liga} 
      miLiga={miLiga} 
      notificaciones={notificaciones}
      cantNotiUser={cantNotiUser}
      classMain={(liga.length == 0) ? `bg-black` : ``}
      >
        <div className='flex justify-center w-full h-fit px-20'>       
        {equipo ? (
          <TabJugadores 
            user={user} 
            liga={liga} 
            equipo={equipo} 
            jugadores={jugadores}
            patrocinadores={patrocinadores}
            />
          ) : (
            <AlertRedireccion 
              titulo={'Este equipo no existe! Sera redirigido a una lista con todas las ligas'} 
              texto={''} 
              tiempo={3500} 
              icono={'error'} 
              redirectUrl={route('ligas.index')}
              />
          )   
        }
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index