import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import { router } from '@inertiajs/react';
import TablaPaginadaJugadores from './TablaPaginadaJugadores';

const CardJugadores = ({ user, liga, equipo, jugadores }) => {
  const [isAnadirJugadorOpen, setAnadirJugadorOpen] = useState(false);
  const [isEditarJugadorOpen, setEditarJugadorOpen] = useState(false);
  const [isEliminarJugadorOpen, setEliminarJugadorOpen] = useState(false);
  const [jugadorEditar, setJugadorEditar] = useState(null);
  const [jugadorEliminar, setJugadorEliminar] = useState(null);

  const openAnadirJugadorModal = () => {
    setAnadirJugadorOpen(true);
  };

  const closeAnadirJugadorModal = () => {
    setAnadirJugadorOpen(false);
  };

  const openEditarJugadorModal = (jugador) => {
    setJugadorEditar(jugador);
    setEditarJugadorOpen(true);
  };

  const closeEditarJugadorModal = () => {
    setEditarJugadorOpen(false);
  };

  const openEliminarJugadorModal = (jugador) => {
    setJugadorEliminar(jugador);
    setEliminarJugadorOpen(true);
  };

  const closeEliminarJugadorModal = () => {
    setEliminarJugadorOpen(false);
  };

  const handleDelete = () => {
    closeEliminarJugadorModal();
    router.post(route('jugadores.destroy',jugadorEliminar.id), {
       _method: 'delete',
    })
  };

  return (
    <div className="grid grid-cols-1 shadow-xl w-full border border-gray-50 rounded-lg">
      <div className={`flex w-full ${user.id === liga.user_id ? `justify-between `: `justify-center `} items-center bg-black pt-1 pr-4 border border-gray-50 rounded-lg`}>
        <a href={route('ligas.show',liga.user_id)}><img className="h-52 w-auto rounded-full shadow-xl" src={'/images/'+liga.logo}  alt={`Liga `+liga.nombre}/></a>
        {(user.id === liga.user_id) && (
          <PrimaryButton
            className='bg-orange-500 text-xl h-20 hover:bg-orange-600 hover:text-white'
            onClick={openAnadirJugadorModal}
          >
            Añadir jugador <span className='text-2xl'><ion-icon name="add-circle"></ion-icon></span>
          </PrimaryButton>
        )}
      </div>
      <TablaPaginadaJugadores liga={liga} user={user} equipo={equipo} jugadores={jugadores} isAnadirJugadorOpen={isAnadirJugadorOpen}
      openAnadirJugadorModal={openAnadirJugadorModal} closeAnadirJugadorModal={closeAnadirJugadorModal} openEditarJugadorModal={openEditarJugadorModal} 
      closeEditarJugadorModal={closeEditarJugadorModal} isEditarJugadorOpen={isEditarJugadorOpen} jugadorEditar={jugadorEditar} openEliminarJugadorModal={openEliminarJugadorModal}
      closeEliminarJugadorModal={closeEliminarJugadorModal} isEliminarJugadorOpen={isEliminarJugadorOpen} jugadorEliminar={jugadorEliminar} handleDelete={handleDelete}/>
    </div>
  );
};

export default CardJugadores;
