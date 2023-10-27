import React from 'react';
import ModalCrearEquipo from './ModalCrearEquipo';
import ModalEliminarEquipo from './ModalEliminarEquipo';
import Dropdown from '../Dropdown';
import { BotonEditar, BotonEliminar, BotonJugadores, BotonOpciones } from '../BotonesAcciones';

const TablaEquipos = ({ fechas, liga, user, equipos, calendario, openEditarEquipoModal, openDeleteModal, equipoEditar, equipoEliminar, isEditarModalOpen, isDeleteModalOpen, closeEditarEquipoModal, closeDeleteModal, setShowAlert, setTituloAlert }) => {
  return (
    <>
    <table className="text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-base text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr className='grid grid-cols-3 md:grid-cols-5'>
                <th scope="col" className="flex justify-center py-1">
                  <p className='md:hidden'>Equipo</p>
                </th>
                <th scope="col" className="hidden md:flex px-6 py-1">
                  Nombre
                </th>
                <th scope="col" className="hidden md:flex px-6 py-1">
                  Descripcion
                </th>
                <th scope="col" className="md:px-6 py-1">
                  Jugadores
                </th>
                <th scope="col" className='px-6 py-1 flex justify-end'>
                  Accion
                </th>
              </tr>
          </thead>
          <tbody className='text-sm'>
              {equipos.map((equipo) => (
                <tr key={equipo.id} className="bg-white border-b grid grid-cols-3 md:grid-cols-5 dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">
                      <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto md:w-32 rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img>
                    </td>
                    <td scope="row" className="hidden md:flex items-center px-6 py-4  text-gray-900 dark:text-white">
                      {equipo.nombre}
                    </td>
                    <td className="hidden md:flex px-6 py-4 items-center text-gray-900 overflow-hidden">{equipo.descripcion}</td>
                    <td className='pt-2 pr-5 flex items-center justify-center'>
                        <a href={route('jugadores.index',equipo.id)}>
                            <BotonJugadores />
                        </a>       
                    </td>
                    <td className='pt-2 pr-5 flex justify-end items-center'>
                      {liga.user_id === user.id &&(
                        <Dropdown>
                            <Dropdown.Trigger>
                                <BotonOpciones />
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <ul className='p-1'>
                                    <li>
                                        <BotonEditar
                                          onClick={() => openEditarEquipoModal(equipo)}
                                          className={` ${(liga.user_id === user.id) ? 'block w-full justify-center' : 'hidden'}`}
                                          />
                                    </li>
                                    <li>
                                        <BotonEliminar 
                                          className={`flex justify-center text-xl mt-1 hover:bg-red-700 hover:text-white w-full h-full ${(liga.user_id === user.id) ? '' : 'hidden'}`} 
                                          onClick={() => openDeleteModal(equipo)} 
                                          />
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
      {isDeleteModalOpen &&(
        <ModalEliminarEquipo 
          fechas={fechas} 
          equipo={equipoEliminar} 
          onCancel={closeDeleteModal} 
          onDelete={closeDeleteModal} 
          setShowAlert={setShowAlert} 
          setTituloAlert={setTituloAlert}
          />
      )}
      {isEditarModalOpen&& (
        <ModalCrearEquipo 
          equipo={equipoEditar} 
          liga={liga} 
          actionRoute={'equipos.update'}
          onCancel={closeEditarEquipoModal} 
          onAdd={closeEditarEquipoModal} 
          onEdit={closeEditarEquipoModal} 
          accion={'editar'} 
          setShowAlert={setShowAlert} 
          setTituloAlert={setTituloAlert}
          caledario={calendario}
          />
      )}
    </>
  );
};

export default TablaEquipos;