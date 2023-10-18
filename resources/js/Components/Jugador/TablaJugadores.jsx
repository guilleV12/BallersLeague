import React,{ useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import ModalJugador from './ModalJugador';
import ModalEliminarJugador from './ModalEliminarJugador';

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
    {isAnadirJugadorOpen &&(<ModalJugador jugadores={jugadores} jugador={jugadorEditar} equipo={equipo} liga={liga} onCancel={closeAnadirJugadorModal} onAdd={closeAnadirJugadorModal} onEdit={closeAnadirJugadorModal} accion={'agregar'} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
    {isEditarJugadorOpen &&(<ModalJugador jugador={jugadorEditar} equipo={equipo} liga={liga} onCancel={closeEditarJugadorModal} onAdd={closeAnadirJugadorModal} onEdit={closeEditarJugadorModal} accion={'editar'} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
    {isEliminarJugadorOpen &&(<ModalEliminarJugador jugador={jugadorEliminar} onDelete={closeEliminarJugadorModal} onCancel={closeEliminarJugadorModal} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
    
    <table className=" text-left text-black dark:text-gray-400 w-full border border-gray-200 rounded-lg shadow">
      <thead className="text-lg font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400 border border-gray-50 rounded-lg">
        <tr className='grid grid-cols-6'>
          <th scope='col' className='px-6 py-1'>
            
          </th>
          <th scope="col" className="px-6 py-1">
            Nombre
          </th>
          <th scope="col" className="px-6 py-1">
            Apellido
          </th>
          <th scope="col" className="px-6 py-1">
            Dni
          </th>
          <th scope="col" className="px-6 py-1">
            Edad
          </th>
          <th scope="col" className='px-6 py-1 flex justify-end'>
            Accion
          </th>
        </tr>
      </thead>
      <tbody>
        {jugadores.map((jugador) => (
          <tr key={jugador.id} className="bg-white border-b grid grid-cols-6 dark:bg-gray-900 dark:border-gray-700">
            <td scope="row" className="items-center px-6 text-lg py-4"><img src={`/images/${jugador.foto_perfil}?${new Date().getTime()}`} className='h-20 w-auto rounded-full'></img></td>
            <td className="px-6 py-1 flex items-center justify-start">{jugador.nombre}</td>
            <td className="px-6 py-1 flex items-center justify-start">{jugador.apellido}</td>
            <td className="px-6 py-1 flex items-center justify-start">{jugador.dni}</td>
            <td className="px-6 py-1 flex items-center justify-start">{edad(jugador)}</td>
            <td className={`pt-2 pr-2 text-lg flex justify-end ${(liga.user_id === user.id) ? '' : 'hidden'}`}>
              <Dropdown>
                  <Dropdown.Trigger>
                      <span className='text-3xl text-orange-500 font-bold hover:cursor-pointer'>
                          <ion-icon name="options"></ion-icon>
                      </span>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                      <ul className='p-1'>
                          <li>
                              <PrimaryButton className='flex justify-center bg-orange-500 text-xl hover:bg-orange-600 hover:text-white w-full h-full' onClick={() => openEditarJugadorModal(jugador)}>Editar</PrimaryButton>
                          </li>
                          <li>
                              <PrimaryButton className='flex justify-center bg-orange-500 text-xl mt-1 hover:bg-orange-600 hover:text-white w-full' onClick={() => openEliminarJugadorModal(jugador)}>Eliminar</PrimaryButton>
                          </li>
                          <li>
                                <PrimaryButton className='flex justify-center bg-orange-500 text-xl mt-1 hover:bg-orange-600 hover:text-white w-full'>Estadisticas</PrimaryButton>
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
