import React from 'react';
import { BotonConfirmarArbitros, BotonEliminar } from '../BotonesAcciones';

const TablaArbitros = ({  openDeleteModal, arbitros, users, openConfirmarModal, userAdmin, userAuth }) => {
  return (
    <>
   <table className="text-gray-500 dark:text-gray-400 w-full h-min-screen ">
            <thead className="text-base text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr className='flex md:hidden'>
                  <th scope="col" className="px-6 py-1 flex w-full justify-center md:hidden">
                    Arbitros
                  </th>
                </tr>
                <tr className='hidden md:grid md:grid-cols-4'>
                  <th scope="col" className="px-6 py-1 hidden md:flex">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-1 hidden md:flex">
                    DNI
                  </th>
                  <th scope='col' className='px-6 py-1 hidden md:flex'>
                    Estado
                  </th>
                  <th scope="col" className='px-6 py-1 hidden md:flex justify-end'>
                    Accion
                  </th>
                </tr>
            </thead>
            <tbody>
                {arbitros.map((arbitro) => (
                    users.map((usuario) => (usuario.id === arbitro.id_user) ? (
                        <tr key={arbitro.id} className="bg-white border-b grid grid-cols-2 md:grid-cols-4 dark:bg-gray-900 dark:border-gray-700 text-sm rounded-b-lg">
                            <td className="px-6 py-4 font-medium flex items-center text-gray-900">{usuario.nombre} {usuario.apellido}</td>
                            <td className="flex px-6 py-4 items-center text-black">{usuario.dni}</td>
                            <td className="flex px-6  py-4 items-center">
                              {arbitro.confirmado === 1 ? (<span className='text-green-400'>Confirmado</span>) : (<span className='text-yellow-400'>Esperando respuesta</span>)}
                            </td>
                            <td className='grid justify-end py-2 pr-4'>
                                  { userAdmin.id === userAuth.id ? (
                                      <BotonEliminar 
                                      onClick={() => openDeleteModal(usuario, arbitro)} 
                                      className={'w-28 mt-1 flex justify-center'}
                                      />
                                    ):('')}
                                  {(arbitro.confirmado === 0 && userAuth.id === arbitro.id_user) ? (
                                    <BotonConfirmarArbitros 
                                      onClick={() => openConfirmarModal(arbitro)} 
                                      className={'flex justify-center w-28 h-8 mt-1'}
                                      />
                                      
                                    ) : ('')
                                  }
                            </td>
                        </tr>
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