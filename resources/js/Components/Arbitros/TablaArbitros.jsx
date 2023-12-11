import React from 'react';
import { BotonConfirmarArbitros, BotonEliminar } from '../BotonesAcciones';

const TablaArbitros = ({  openDeleteModal, arbitros, users, openConfirmarModal, userAdmin, userAuth, liga, user }) => {
  return (
    <>
   <table className="text-gray-500 dark:text-gray-400 w-full h-min-screen ">
            <thead className="text-base text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr className={`grid ${(userAuth && userAdmin.id === userAuth.id)?'grid-cols-3 md:grid-cols-4':'grid-cols-3 md:grid-cols-4'}`}>
                <th scope="col" className="flex justify-center md:hidden">
                    Arbitros
                  </th>
                  <th scope="col" className=" hidden md:flex justify-center">
                    Nombre
                  </th>
                  <th scope="col" className="hidden md:flex justify-center">
                    DNI
                  </th>
                  <th scope='col' className='flex justify-center'>
                    Estado
                  </th>
                    <th scope="col" className={`flex justify-center`}>
                    {(user && user.id === liga.user_id) ?('Accion'):('')}
                    </th>
                  
                </tr>
            </thead>
            <tbody>
                {arbitros.map((arbitro) => (
                    users.map((usuario) => ( (usuario.id === arbitro.id_user) ) ? (
                      (arbitro.deshabilitado === 0) ? (
                        <tr key={arbitro.id} className={`bg-white border-b grid ${(userAuth && userAdmin.id === userAuth.id)?'grid-cols-3 md:grid-cols-4':'grid-cols-3 md:grid-cols-4'} dark:bg-gray-900 dark:border-gray-700 text-sm rounded-b-lg`}>
                            <td className="flex justify-center items-center text-gray-900">{usuario.nombre} {usuario.apellido}</td>
                            <td className="hidden md:flex justify-center items-center text-black">{usuario.dni}</td>
                            <td className="flex justify-center items-center">
                              {arbitro.confirmado === 1 ? (<span className='text-green-400'>Confirmado</span>) : (<span className='text-yellow-400'>Esperando respuesta</span>)}
                            </td>
                            <td className='grid justify-center items-center space-y-1'>
                                  { (userAuth && userAdmin.id === userAuth.id) ? (
                                      <BotonEliminar 
                                      onClick={() => openDeleteModal(usuario, arbitro)} 
                                      className={'flex justify-center'}
                                      />
                                    ):('')}
                                  {(arbitro.confirmado === 0 && userAuth.id === arbitro.id_user) ? (
                                    <BotonConfirmarArbitros 
                                      onClick={() => openConfirmarModal(arbitro)} 
                                      className={'flex justify-center'}
                                      />
                                      
                                    ) : ('')
                                  }
                            </td>
                        </tr>
                      ):('')
                    ):(
                      ''
                    )) 
                ))}
            </tbody>
        </table>
    </>
  );
};

export default TablaArbitros;