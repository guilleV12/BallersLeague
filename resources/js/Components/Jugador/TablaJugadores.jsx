import React,{ useState } from 'react';
import Dropdown from '../Dropdown';
import ModalCrearJugador from './ModalCrearJugador';
import ModalEliminarJugador from './ModalEliminarJugador';
import { BotonContenido, BotonEditar, BotonEliminar, BotonOpciones } from '../BotonesAcciones';

const TablaJugadores = ({ jugadores, liga, user, equipo, isAnadirJugadorOpen, closeAnadirJugadorModal, openEditarJugadorModal, closeEditarJugadorModal, isEditarJugadorOpen, jugadorEditar, openEliminarJugadorModal, closeEliminarJugadorModal, isEliminarJugadorOpen, jugadorEliminar, setShowAlert, setTituloAlert }) => {
  
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
    
    <table className=" text-left text-black dark:text-gray-400 w-full rounded-lg shadow">
      <thead className="text-base font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400 rounded-lg">
        <tr className={`grid ${(user && user.id === liga.user_id) ? `grid-cols-5` : `grid-cols-4`}`}>
          <th scope='col' className='flex justify-center'>
            Jugador
          </th>
          <th scope="col" className="flex justify-center">
            Nombre
          </th>
          <th scope="col" className="hidden md:flex justify-center">
            Dni
          </th>
          <th scope="col" className="hidden md:flex justify-center">
            Edad
          </th>
          {(user && user.id === liga.user_id) &&(
            <th scope="col" className='flex justify-center'>
              Accion
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {jugadores
          .filter((jugador) => jugador.deshabilitado === 0)
          .map((jugador) => (
          <tr key={jugador.id} className={`bg-white border-b grid ${(user && user.id === liga.user_id) ? `grid-cols-5` : `grid-cols-4`} dark:bg-gray-900 dark:border-gray-700 text-sm`}>
            <td scope="row" className="flex justify-center items-center">
                <img src={`/images/${jugador.foto_perfil}?${new Date().getTime()}`} className='w-24 h-auto rounded-full' title={`jugador: ${jugador.nombre+` `+jugador.apellido}`} alt={`jugador: ${jugador.nombre+` `+jugador.apellido}`}></img>
            </td>
            <td className="flex justify-center items-center">{jugador.nombre} {jugador.apellido}</td>
            <td className="hidden md:flex justify-center items-center">{jugador.dni}</td>
            <td className="hidden md:flex justify-center items-center">{edad(jugador)}</td>
            <td className={`flex justify-center items-center ${(user && liga.user_id === user.id) ? '' : 'hidden'}`}>
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
