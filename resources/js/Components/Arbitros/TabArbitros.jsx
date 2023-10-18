import React, { useState } from 'react'
import ModalEliminarArbitro from './ModalEliminarArbitro';
import PrimaryButton from '../PrimaryButton';
import { ModalConfirmar } from './ModalConfirmar';

export const TabArbitros = ({ arbitros, users, userAdmin, userAuth, liga, setShowAlert, setTituloAlert, openAnadirArbitroModal }) => {
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

  return (
    <div className='grid grid-cols-1 justify-center'>
        {isConfirmarModalOpen === true ? (
            <ModalConfirmar closeConfirmarModal={closeConfirmarModal} arbitro={arbitroConfirmar} liga={liga} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
        ):('')}
        {isDeleteModalOpen === true ? (
            <ModalEliminarArbitro arbitro={arbitroEliminar} user={user} onDelete={closeDeleteModal} onCancel={closeDeleteModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
        ):('')}
         {userAdmin.id === userAuth.id && (
          <div className='flex w-full justify-center bg-black pt-1 '>
            <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openAnadirArbitroModal}>
                    Añadir arbitro
            </PrimaryButton>
          </div>
         )}
        
        <table className="text-sm text-gray-500 dark:text-gray-400 w-full h-min-screen">
            <thead className=" text-lg text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
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
                  <th scope="col" className='px-6 py-1 flex justify-end'>
                    Accion
                  </th>
                </tr>
            </thead>
            <tbody>
                {arbitros.map((arbitro) => (
                    users.map((usuario) => (usuario.id === arbitro.id_user) ? (
                        <tr key={arbitro.id} className="bg-white border-b grid grid-cols-5 dark:bg-gray-900 dark:border-gray-700 text-lg ">
                            <td className="px-6 py-4 font-medium flex items-center text-gray-900">{usuario.nombre}</td>
                            <td scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white">{usuario.apellido}</td>
                            <td className="flex px-6 py-4 items-center text-black">{usuario.dni}</td>
                            <td className="flex px-6  py-4 items-center">
                              {arbitro.confirmado === 1 ? (<span className='text-green-400'>Confirmado</span>) : (<span className='text-yellow-400'>Esperando respuesta</span>)}
                            </td>
                            <td className='py-2 px-4'>
                                  { userAdmin.id === userAuth.id ? (
                                      <PrimaryButton onClick={() => openDeleteModal(usuario,arbitro)} className='bg-red-500 w-full flex justify-center'>Eliminar</PrimaryButton>
                                    ):('')}
                                  {(arbitro.confirmado === 0 && userAuth.id === arbitro.id_user) ? (
                                      <PrimaryButton onClick={() => openConfirmarModal(arbitro)} className='bg-orange-500 flex justify-center w-full mt-1'>Invitacion</PrimaryButton>
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
