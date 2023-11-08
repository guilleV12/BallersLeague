import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import CardLigaShow from '@/Components/Liga/CardLigaShow'
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion'

const Show = ({ cantNotiUser, auth, user, liga, equipos, userAdmin, arbitros, users, miLiga, calendario, fechas, jugadores, partidos, jugadorPartido, rol, notificacionesUsuario, notificaciones }) => {
  return (
    <AuthenticatedLayout auth={auth} user={user} liga={liga} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
        <Head title='Ligas'/>
        <div className='flex justify-center lg:items-center w-full lg:w-[78%] h-fit  lg:ml-[15.5rem] xl:ml-[16rem]'>
                {liga ? (liga[0] ? (
                  <CardLigaShow notificacionesUsuario={notificacionesUsuario} rol={rol} jugadorPartido={jugadorPartido} partidos={partidos} jugadores={jugadores} liga={liga[0]} user={user} equipos={equipos} userAdmin={userAdmin[0]} arbitros={arbitros} users={users} calendario={calendario} fechas={fechas}></CardLigaShow>
                ) : (
                  <AlertRedireccion titulo={'Esta liga ya no existe! Sera redirigido a una lista con todas las ligas'} texto={''} tiempo={3500} icono={'error'} redirectUrl={route('ligas.index')}/>
                )) : (
                  <AlertRedireccion titulo={'Esta liga ya no existe! Sera redirigido a una lista con todas las ligas'} texto={''} tiempo={3500} icono={'error'} redirectUrl={route('ligas.index')} />
                )
                }
        </div>
    </AuthenticatedLayout>
  )
}

export default Show