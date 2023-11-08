import React,{ useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TablaPaginada from '@/Components/Liga/TablaPaginada'
import { Head } from '@inertiajs/react'
import Alert from '@/Components/Alerts/Alert'

const Index = ({ user, ligas, users, tituloAlert, activarAlert, miLiga, notificaciones, cantNotiUser }) => {
  const [showAlert, setShowAlert] = useState(activarAlert?true:false);

  const closeAlert = () => {
    setShowAlert(false); 
  };

  return (
    <>
    <Head title="Ligas"/>
    <AuthenticatedLayout user={user} miLiga={miLiga} notificaciones={notificaciones} cantNotiUser={cantNotiUser}>
        <div className='flex justify-center w-full lg:w-3/4 h-fit lg:ml-[15.5rem] xl:ml-[17rem]'>
            {showAlert &&(<Alert titulo={tituloAlert?tituloAlert:''} texto={''} tiempo={3000} showAlert={showAlert} icono={'success'} closeAlert={closeAlert}></Alert>)}
            <TablaPaginada data={ligas} user={user} users={users} className=' '/>          
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index