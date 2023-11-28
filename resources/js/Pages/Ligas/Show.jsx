import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import CardLigaShow from '@/Components/Liga/CardLigaShow'
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion'

const Show = ({ votosJMV, goleadores, tablaPosiciones, patrocinadores, campeon, partidosPlayoffs, fechasPlayoffs, playoffs, cantNotiUser, auth, user, liga, equipos, userAdmin, arbitros, users, miLiga, calendario, fechas, jugadores, partidos, jugadorPartido, rol, notificacionesUsuario, notificaciones }) => {
  return (
    <AuthenticatedLayout auth={auth} user={user} liga={liga} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
        <Head title={`Liga: ${liga[0].nombre}`}/>
        <div className='flex justify-center w-full h-fit lg:px-14'>
                {liga ? (liga[0] ? (
                  <CardLigaShow votosJMV={votosJMV} goleadores={goleadores} tablaPosiciones={tablaPosiciones} patrocinadores={patrocinadores} campeon={campeon} partidosPlayoffs={partidosPlayoffs} fechasPlayoffs={fechasPlayoffs} playoffs={playoffs} notificacionesUsuario={notificacionesUsuario} rol={rol} jugadorPartido={jugadorPartido} partidos={partidos} jugadores={jugadores} liga={liga[0]} user={user} equipos={equipos} userAdmin={userAdmin[0]} arbitros={arbitros} users={users} calendario={calendario} fechas={fechas}></CardLigaShow>
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