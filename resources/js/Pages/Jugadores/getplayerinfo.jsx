import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react'

export const getplayerinfo = ({ playerData, user, miLiga, userApi}) => {
    console.log(userApi);
  return (
    <>
    <Head 
      title={playerData.strPlayer+' perfil'}
      />
    <AuthenticatedLayout 
      user={user} 
      miLiga={miLiga} 
      >
        <div className='flex justify-center lg:items-center w-full lg:w-[78%] h-fit  lg:ml-[15.5rem] xl:ml-[16rem]'>
    
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={playerData.strCutout} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{playerData.strPlayer}</h5>
                    </a>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Fecha de nacimiento: {playerData.dateBorn}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Ciudad de origen: {playerData.strBirthLocation}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Nacionalidad: {playerData.strNationality}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Altura y peso: {playerData.strHeight} / {playerData.strWeight}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Posicion: {playerData.strPosition}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Equipo actual: {playerData.strTeam}.</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Dorsal: {playerData.strNumber}.</p>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    </>
  )
}
export default getplayerinfo;