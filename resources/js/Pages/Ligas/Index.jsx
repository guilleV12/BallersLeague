import React,{ useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TablaPaginada from '@/Components/Liga/TablaPaginada'
import { Head } from '@inertiajs/react'
import Alert from '@/Components/Alerts/Alert'

const Index = ({ user, ligas, users, tituloAlert, activarAlert, miLiga }) => {
  const [showAlert, setShowAlert] = useState(activarAlert?true:false);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
    <Head title="Ligas"/>
    <AuthenticatedLayout user={user} miLiga={miLiga}>
        <div className='flex justify-center w-2/3'>
            {showAlert &&(<Alert titulo={tituloAlert?tituloAlert:''} texto={''} tiempo={3000} showAlert={showAlert} icono={'success'} closeAlert={closeAlert}></Alert>)}
            <TablaPaginada data={ligas} user={user} users={users} className=' w-[70%] ml-[10%] '/>          
        </div>
    </AuthenticatedLayout>
    </>
  )
}

export default Index