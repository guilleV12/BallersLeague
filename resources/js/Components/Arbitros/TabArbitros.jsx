import React, { useState } from 'react';
import ModalEliminarArbitro from './ModalEliminarArbitro';
import ModalConfirmar from './ModalConfirmar';
import ModalCrearArbitro from './ModalCrearArbitro';
import { BotonAnadirArbitros, BotonConfirmarArbitros, BotonEliminar } from '../BotonesAcciones';

const TabArbitros = ({ arbitros, users, userAdmin, userAuth, liga, setShowAlert, setTituloAlert, fechas, partidos }) => {
  const [arbitroEliminar, setArbitroEliminar] = useState(null);
  const [arbitroConfirmar, setArbitroConfirmar] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmarModalOpen, setIsConfirmarModalOpen] = useState(false);
  const [isAnadirArbitroModalOpen, setIsAnadirArbitroModalOpen] = useState(false);

  const openDeleteModal = (usuario, arbitro) => {
    setArbitroEliminar(arbitro);
    setUser(usuario);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openConfirmarModal = (arbitro) => {
    setArbitroConfirmar(arbitro);
    setIsConfirmarModalOpen(true);
  };

  const closeConfirmarModal = () => {
    setIsConfirmarModalOpen(false);
  };

  const openAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(true);
  };

  const closeAnadirArbitroModal = () => {
    setIsAnadirArbitroModalOpen(false);
  };

  return (
    <div className='grid grid-cols-1 justify-center'>
      {isConfirmarModalOpen && (
        <ModalConfirmar
          closeConfirmarModal={closeConfirmarModal}
          arbitro={arbitroConfirmar}
          liga={liga}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {isDeleteModalOpen && (
        <ModalEliminarArbitro
          fechas={fechas}
          partidos={partidos}
          arbitro={arbitroEliminar}
          user={user}
          onDelete={closeDeleteModal}
          onCancel={closeDeleteModal}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {isAnadirArbitroModalOpen && (
        <ModalCrearArbitro
          liga={liga} 
          onCancel={closeAnadirArbitroModal}
          onAdd={closeAnadirArbitroModal}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}
      {userAdmin.id === userAuth.id && (
        <div className="flex w-full justify-center space-x-4 py-5 bg-black">
          <BotonAnadirArbitros 
            onClick={openAnadirArbitroModal} 
            />
        </div>
      )}
        
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
        
    </div>
  )
}
export default TabArbitros;
