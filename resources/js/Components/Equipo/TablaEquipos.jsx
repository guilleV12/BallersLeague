import React from 'react';
import ModalCrearEquipo from './ModalCrearEquipo';
import ModalEliminarEquipo from './ModalEliminarEquipo';
import Dropdown from '../Dropdown';
import { BotonEditar, BotonEliminar, BotonJugadores, BotonOpciones } from '../BotonesAcciones';

const TablaEquipos = ({ partidos, fechas, liga, user, equipos, calendario, openEditarEquipoModal, openDeleteModal, equipoEditar, equipoEliminar, isEditarModalOpen, isDeleteModalOpen, closeEditarEquipoModal, closeDeleteModal, setShowAlert, setTituloAlert }) => {
  return (
    <>
    <table className="text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-base text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr className={`grid ${((user && user.id === liga.user_id)) ? `grid-cols-5` : `grid-cols-4`}`}>
                <th scope="col" className="flex justify-center">
                  Equipo
                </th>
                <th scope="col" className="hidden md:flex justify-center">
                  Nombre
                </th>
                <th scope="col" className="hidden md:flex justify-center">
                  Descripcion
                </th>
                <th scope="col" className="md:flex justify-center">
                  Jugadores
                </th>
                {((user && user.id === liga.user_id))&&(
                  <th scope="col" className='flex justify-center'>
                    Accion
                  </th>)
                }
              </tr>
          </thead>
          <tbody className='text-sm'>
              {equipos.map((equipo) => (
                <tr key={equipo.id} className={`bg-white border-b grid ${((user && user.id === liga.user_id)) ? `grid-cols-5` : `grid-cols-4`} dark:bg-gray-900 dark:border-gray-700`}>
                    <td className="flex justify-center items-center">
                      <img src={`/images/${equipo.logo}?${new Date().getTime()}`} className='w-24 h-auto rounded-full' alt={`Logo ${equipo.nombre}`} title={`Logo ${equipo.nombre}`}></img>
                    </td>
                    <td scope="row" className="hidden md:flex justify-center items-center  text-gray-900 dark:text-white">
                      {equipo.nombre}
                    </td>
                    <td className="hidden md:flex justify-center items-center text-gray-900 overflow-hidden">{equipo.descripcion}</td>
                    <td className='flex justify-center items-center'>
                        <a href={route('jugadores.index',equipo.id)}>
                            <BotonJugadores />
                        </a>       
                    </td>
                    <td className='flex justify-center items-center'>
                      {(user && liga.user_id === user.id) &&(
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
          partidos={partidos}
          setTituloAlert={setTituloAlert}
          />
      )}
      {isEditarModalOpen&& (
        <ModalCrearEquipo 
          equipo={equipoEditar} 
          liga={liga} 
          partidos={partidos}
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