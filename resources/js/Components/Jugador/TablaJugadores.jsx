import React,{ useState } from 'react';
import Dropdown from '../Dropdown';
import ModalCrearJugador from './ModalCrearJugador';
import ModalEliminarJugador from './ModalEliminarJugador';
import { BotonContenido, BotonEditar, BotonEliminar, BotonOpciones } from '../BotonesAcciones';

const TablaJugadores = ({jugadores, liga, user, equipo, isAnadirJugadorOpen, closeAnadirJugadorModal, openEditarJugadorModal, closeEditarJugadorModal, isEditarJugadorOpen, jugadorEditar, openEliminarJugadorModal, closeEliminarJugadorModal, isEliminarJugadorOpen, jugadorEliminar, setShowAlert, setTituloAlert }) => {
  
  const edad = (jugadorCalcularEdad) => {
    const fechaNacimiento = new Date(jugadorCalcularEdad.fecha_nacimiento);
    const fechaActual = new Date();
    const diferenciaMilisegundos = fechaActual - fechaNacimiento;
    const edad = Math.floor(diferenciaMilisegundos / (365 * 24 * 60 * 60 * 1000));
    return edad;
  };

  return (
    <>
    {isAnadirJugadorOpen &&(
      <ModalCrearJugador 
        jugadores={jugadores} 
        jugador={jugadorEditar} 
        equipo={equipo} 
        liga={liga} 
        onCancel={closeAnadirJugadorModal} 
        onAdd={closeAnadirJugadorModal} 
        onEdit={closeAnadirJugadorModal} 
        accion={'agregar'} 
        setShowAlert={setShowAlert} 
        setTituloAlert={setTituloAlert}
        actionRoute={'jugadores.store'}
        />
    
    )}
    {isEditarJugadorOpen &&(
      <ModalCrearJugador 
        jugador={jugadorEditar} 
        equipo={equipo} 
        liga={liga} 
        onCancel={closeEditarJugadorModal} 
        onAdd={closeAnadirJugadorModal} 
        onEdit={closeEditarJugadorModal} 
        accion={'editar'} 
        setShowAlert={setShowAlert} 
        setTituloAlert={setTituloAlert}
        actionRoute={'jugadores.update'}
        />
    )}
    {isEliminarJugadorOpen &&(
      <ModalEliminarJugador 
        jugador={jugadorEliminar} 
        onDelete={closeEliminarJugadorModal} 
        onCancel={closeEliminarJugadorModal} 
        setShowAlert={setShowAlert} 
        setTituloAlert={setTituloAlert}
        />
    )}
    
    <table className=" text-left text-black dark:text-gray-400 w-full border border-gray-200 rounded-lg shadow">
      <thead className="text-base font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400 border border-gray-50 rounded-lg">
        <tr className='grid grid-cols-3 md:grid-cols-5'>
          <th scope='col' className='px-6 py-1'>
            
          </th>
          <th scope="col" className="px-6 py-1">
            Nombre
          </th>
          <th scope="col" className="hidden md:flex px-6 py-1">
            Dni
          </th>
          <th scope="col" className="hidden md:flex px-6 py-1">
            Edad
          </th>
          <th scope="col" className='px-6 py-1 flex justify-end'>
            Accion
          </th>
        </tr>
      </thead>
      <tbody>
        {jugadores
          .filter((jugador) => jugador.deshabilitado === 0)
          .map((jugador) => (
          <tr key={jugador.id} className="bg-white border-b grid grid-cols-3 md:grid-cols-5 dark:bg-gray-900 dark:border-gray-700 text-sm">
            <td scope="row" className="items-center px-6 text-lg">
              <div className='w-full flex justify-center items-center '>
                <div className='w-40 h-40 rounded-full bg-white flex justify-center items-center'>
                <img src={`/images/${jugador.foto_perfil}?${new Date().getTime()}`} className='w-auto h-20 rounded-full'></img>
                </div>
              </div>
            </td>
            <td className="px-6 py-1 flex items-center justify-start">{jugador.nombre} {jugador.apellido}</td>
            <td className="px-6 py-1 hidden md:flex items-center justify-start">{jugador.dni}</td>
            <td className="px-6 py-1 hidden md:flex items-center justify-start">{edad(jugador)}</td>
            <td className={`pt-2 pr-5 flex justify-end items-center ${(liga.user_id === user.id) ? '' : 'hidden'}`}>
              <Dropdown>
                  <Dropdown.Trigger>
                      <BotonOpciones />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                      <ul className='p-1'>
                          <li>
                              <BotonEditar
                                onClick={() => openEditarJugadorModal(jugador)}
                                className={' block w-full justify-center'}
                                />
                          </li>
                          <li>
                              <BotonEliminar
                                onClick={() => openEliminarJugadorModal(jugador)}
                                className={' block w-full justify-center mt-1'}
                                />
                          </li>
                          <li>
                              <BotonContenido
                                nombre={'Estadisticas'}
                                className={' block w-full justify-center mt-1'}
                                />
                          </li>
                          <li>
                            <a href={route('getplayerinfo.index',(jugador.nombre+' '+jugador.apellido))}>
                              <BotonContenido
                                nombre={'Perfil jugador'}
                                className={' block w-full justify-center mt-1'}
                                />
                            </a>
                          </li>
                      </ul>
                  </Dropdown.Content>
              </Dropdown>              
               
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default TablaJugadores;
