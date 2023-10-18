import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { CardLigaShow } from '@/Components/Liga/CardLigaShow'
import AlertRedireccion from '@/Components/Alerts/AlertRedireccion'

const Show = ({ auth, user, liga, equipos, userAdmin, arbitros, users, miLiga, calendario, fechas, jugadores, partidos, jugadorPartido }) => {
  return (
    <AuthenticatedLayout auth={auth} user={user} liga={liga} miLiga={miLiga}>
        <Head title='Ligas'/>
        <div className='w-full ml-[5%] mr-[1%] flex justify-center min-h-screen'>
                {liga[0] ? (
                  <CardLigaShow jugadorPartido={jugadorPartido} partidos={partidos} jugadores={jugadores} liga={liga[0]} user={user} equipos={equipos} userAdmin={userAdmin[0]} arbitros={arbitros} users={users} calendario={calendario} fechas={fechas}></CardLigaShow>
                ) : (
                  <AlertRedireccion titulo={'Esta liga ya no existe! Sera redirigido a una lista con todas las ligas'} texto={''} tiempo={3500} icono={'error'} redirectUrl={route('ligas.index')}/>
                )
                }
        </div>
    </AuthenticatedLayout>
  )
}

export default Show