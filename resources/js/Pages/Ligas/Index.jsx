import React,{ useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TablaPaginada from '@/Components/Liga/TablaPaginada'
import { Head } from '@inertiajs/react'
import Alert from '@/Components/Alerts/Alert'

const Index = ({ user, ligas, users, tituloAlert, activarAlert, miLiga, notificaciones, cantNotiUser, patrocinadores }) => {
  const [showAlert, setShowAlert] = useState(activarAlert?true:false);

  const closeAlert = () => {
    setShowAlert(false); 
  };

  return (
    <>
    <Head title="Ligas"/>
    <AuthenticatedLayout user={user} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
        <div className='flex justify-center w-full h-fit px-5 md:px-20'>
            {showAlert &&(<Alert titulo={tituloAlert?tituloAlert:''} texto={''} tiempo={3000} showAlert={showAlert} icono={'success'} closeAlert={closeAlert}></Alert>)}
            <TablaPaginada data={ligas} user={user} users={users} className=' ' patrocinadores={patrocinadores}/>          
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index