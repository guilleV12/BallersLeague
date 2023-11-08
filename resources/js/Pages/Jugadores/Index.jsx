import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import TabJugadores from '@/Components/Jugador/TabJugadores';
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion';

const Index = ({ user, liga, jugadores, equipo, miLiga, notificaciones, cantNotiUser }) => {
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
        <div className='flex justify-center lg:items-center w-full lg:w-[78%] h-fit  lg:ml-[15.5rem] xl:ml-[16rem]'>       
        {equipo ? (
          <TabJugadores 
            user={user} 
            liga={liga} 
            equipo={equipo} 
            jugadores={jugadores}
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