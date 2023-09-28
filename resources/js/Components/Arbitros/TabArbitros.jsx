import React, { useState } from 'react'
import { router } from '@inertiajs/react';
import ModalEliminarArbitro from './ModalEliminarArbitro';
import PrimaryButton from '../PrimaryButton';
import { ModalConfirmar } from './ModalConfirmar';


export const TabArbitros = ({ arbitros, liga, users, userAdmin, userAuth }) => {
  const [arbitroEliminar, setArbitroEliminar] = useState(null);
  const [arbitroConfirmar, setArbitroConfirmar] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmarModalOpen, setConfirmarModalOpen] = useState(false);

  const openDeleteModal = (usuario,arbitro) => {
    setArbitroEliminar(arbitro);
    setUser(usuario);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openConfirmarModal = (arbitro) => {
    setArbitroConfirmar(arbitro);
    setConfirmarModalOpen(true);
  };

  const closeConfirmarModal = () => {
    setConfirmarModalOpen(false);
  };

  const handleDelete = () => {
    closeDeleteModal();
    router.post(route('arbitros.destroy',arbitroEliminar.id), {
       _method: 'delete',
    })
  };

  const aceptar = () => {
    router.post(route('arbitros.aceptar',arbitroConfirmar.id), {
      _method: 'patch',
    })
  };
  const rechazar = () => {
    router.post(route('arbitros.destroy',arbitroConfirmar.id), {
      _method: 'delete',
   })
  };
  return (
    <div className='flex justify-center'>
      {isConfirmarModalOpen === true ? (
        <ModalConfirmar onCancel={rechazar} onAcept={aceptar} closeConfirmarModal={closeConfirmarModal}/>
      ):('')}
      {isDeleteModalOpen === true ? (
        <ModalEliminarArbitro arbitro={arbitroEliminar} user={user} onDelete={handleDelete} onCancel={closeDeleteModal} />
      ):('')}
       <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
      <thead className=" text-lg text-left font-bold text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
        <tr className='grid grid-cols-5'>
          <th scope="col" className="px-6 py-1">
            Nombre
          </th>
          <th scope="col" className="px-6 py-1">
            Apellido
          </th><th scope="col" className="px-6 py-1">
            DNI
          </th>
          <th scope='col' className='px-6 py-1'>
            Estado
          </th>
          <th scope="col" className='px-6 py-1'>
            ACCION
          </th>
        </tr>
      </thead>
      <tbody>
        {arbitros.map((arbitro) => (
          users.map((usuario) => (usuario.id === arbitro.id_user) ? (
            <tr key={arbitro.id} className="bg-white border-b grid grid-cols-5 dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 text-lg py-4 font-medium flex items-center text-gray-900">{usuario.nombre}</td>
              <td scope="row" className="flex items-center px-6 text-lg py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {usuario.apellido}
              </td>
              <td className="flex px-6 text-lg py-4 items-center">{usuario.dni}</td>
              <td className="flex px-6 text-md font-bold py-4 items-center">
                {arbitro.confirmado === 1 ? (<span className='text-green-400'>Confirmado</span>) : (<span className='text-yellow-400'>Esperando respuesta</span>)}
              </td>
              <td className='pt-2 text-lg flex items-center justify-center'>
                    { userAdmin.id === userAuth.id ? (
                        <PrimaryButton onClick={() => openDeleteModal(usuario,arbitro)} className='bg-red-500'>Eliminar</PrimaryButton>
                      ):('')}
                    {(arbitro.confirmado === 0 && userAuth.id === arbitro.id_user) ? (
                        <PrimaryButton onClick={() => openConfirmarModal(arbitro)} className='bg-yellow-400'>Invitacion</PrimaryButton>
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
    </div>
  )
}
