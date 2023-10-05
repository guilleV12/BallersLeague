import React from 'react';
import ModalEquipo from './ModalEquipo';
import ModalEliminarEquipo from './ModalEliminarEquipo';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';

const TablaEquipos = ({ fechas, liga, user, equipos, openEditarEquipoModal, openDeleteModal, equipoEditar, equipoEliminar, isEditarModalOpen, isDeleteModalOpen, closeEditarEquipoModal, closeDeleteModal, setShowAlert, setTituloAlert }) => {
  return (
    <>
    <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-lg text-left font-bold text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr className='grid grid-cols-5'>
                <th scope="col" className="flex justify-center py-1">
                  Logo
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
                  {equipos.length > 0 && liga.user_id === user.id ? ('Opciones') : 'Accion'}
                </th>
              </tr>
          </thead>
          <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id} className="bg-white border-b grid grid-cols-5 dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 text-lg py-4"><img src={`/images/${equipo.logo}?${new Date().getTime()}`}></img></td>
                    <td scope="row" className="flex items-center px-6 text-lg py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-hidden">
                      {equipo.nombre}
                    </td>
                    <td className="flex px-6 text-lg py-4 items-center font-medium text-gray-900 whitespace-nowrap overflow-hidden">{equipo.descripcion}</td>
                    <td className='pt-2 pr-5 text-lg flex items-center '>
                        <a href={route('jugadores.index',equipo.id)}>
                            <PrimaryButton className='flex justify-center bg-orange-500 text-xl mt-1 hover:bg-orange-600 hover:text-white w-full'>Lista de jugadores</PrimaryButton>
                        </a>       
                    </td>
                    <td className='pt-2 pr-5 text-lg flex justify-end '>
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