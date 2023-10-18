import React from 'react';
import ModalEquipo from './ModalEquipo';
import ModalEliminarEquipo from './ModalEliminarEquipo';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';

const TablaEquipos = ({ fechas, liga, user, equipos, openEditarEquipoModal, openDeleteModal, equipoEditar, equipoEliminar, isEditarModalOpen, isDeleteModalOpen, closeEditarEquipoModal, closeDeleteModal, setShowAlert, setTituloAlert }) => {
  return (
    <>
    <table className="text-md text-gray-500 dark:text-gray-400 w-full">
          <thead className=" text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr className='grid grid-cols-5'>
                <th scope="col" className="flex justify-center py-1">
                  
                </th>
                <th scope="col" className="px-6 py-1">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-1">
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-1">
                  Jugadores
                </th>
                <th scope="col" className='px-6 py-1 flex justify-end'>
                  Accion
                </th>
              </tr>
          </thead>
          <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id} className="bg-white border-b grid grid-cols-5 dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4"><img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='h-32 w-32'></img></td>
                    <td scope="row" className="flex items-center px-6 py-4  text-gray-900 dark:text-white">
                      {equipo.nombre}
                    </td>
                    <td className="flex px-6 py-4 items-center text-gray-900">{equipo.descripcion}</td>
                    <td className='pt-2 pr-5 flex items-center justify-center'>
                        <a href={route('jugadores.index',equipo.id)}>
                            <PrimaryButton className='flex justify-center bg-orange-500 text-xl mt-1 hover:bg-orange-600 hover:text-white w-full'>jugadores</PrimaryButton>
                        </a>       
                    </td>
                    <td className='pt-2 pr-5 flex justify-end items-center'>
                      {liga.user_id === user.id &&(
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className='text-3xl text-orange-500 font-bold hover:cursor-pointer'>
                                    <ion-icon name="options"></ion-icon>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <ul className='p-1'>
                                    <li>
                                        <PrimaryButton className={`flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full ${(liga.user_id === user.id) ? '' : 'hidden'}`} onClick={() => openEditarEquipoModal(equipo)}>Editar</PrimaryButton>
                                    </li>
                                    <li>
                                        <PrimaryButton className={`flex justify-center bg-orange-500 text-xl mt-1 hover:bg-orange-600 hover:text-white w-full h-full ${(liga.user_id === user.id) ? '' : 'hidden'}`} onClick={() => openDeleteModal(equipo)}>Eliminar</PrimaryButton>
                                    </li>
                                   
                                </ul>
                            </Dropdown.Content>
                        </Dropdown>   
                      )}           
                    </td>
                </tr>
              ))}
          </tbody>
    </table>
      {isDeleteModalOpen &&(<ModalEliminarEquipo fechas={fechas} equipo={equipoEliminar} onCancel={closeDeleteModal} onDelete={closeDeleteModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
      {isEditarModalOpen&& (<ModalEquipo equipo={equipoEditar} liga={liga} onCancel={closeEditarEquipoModal} onAdd={closeEditarEquipoModal} onEdit={closeEditarEquipoModal} className={''} accion={'editar'} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
    </>
  );
};

export default TablaEquipos;