import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import TablaPaginadaJugadores from './TablaPaginadaJugadores';
import Alert from '../Alerts/Alert';

const CardJugadores = ({ user, liga, equipo, jugadores }) => {
  const [isAnadirJugadorOpen, setAnadirJugadorOpen] = useState(false);
  const [isEditarJugadorOpen, setEditarJugadorOpen] = useState(false);
  const [isEliminarJugadorOpen, setEliminarJugadorOpen] = useState(false);
  const [jugadorEditar, setJugadorEditar] = useState(null);
  const [jugadorEliminar, setJugadorEliminar] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [tituloAlert, setTituloAlert] = useState('');

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
  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="grid grid-cols-1 shadow-xl w-full border border-gray-50 rounded-lg">
        <div className={`flex w-full ${user.id === liga.user_id ? `justify-between `: `justify-center `} items-center bg-black py-3 pr-4 border border-gray-50 rounded-lg`}>
            <a href={route('ligas.show',liga.user_id)}><img className="h-52 w-auto rounded-full shadow-xl" src={'/images/'+liga.logo}  alt={`Liga `+liga.nombre} title={`Liga `+liga.nombre}/></a>
            <img className="h-52 w-auto rounded-full shadow-xl" src={'/images/'+equipo.logo}  alt={`Liga `+liga.nombre}/>
            {(user.id === liga.user_id) && (
              <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openAnadirJugadorModal}>
                  Añadir jugador
              </PrimaryButton>
            )}
        </div>
        <TablaPaginadaJugadores liga={liga} user={user} equipo={equipo} jugadores={jugadores} isAnadirJugadorOpen={isAnadirJugadorOpen} openAnadirJugadorModal={openAnadirJugadorModal} closeAnadirJugadorModal={closeAnadirJugadorModal} openEditarJugadorModal={openEditarJugadorModal}  closeEditarJugadorModal={closeEditarJugadorModal} isEditarJugadorOpen={isEditarJugadorOpen} jugadorEditar={jugadorEditar} openEliminarJugadorModal={openEliminarJugadorModal} closeEliminarJugadorModal={closeEliminarJugadorModal} isEliminarJugadorOpen={isEliminarJugadorOpen} jugadorEliminar={jugadorEliminar} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
        {showAlert &&(<Alert titulo={tituloAlert} texto={''} tiempo={3000} showAlert={showAlert} icono={'success'} closeAlert={closeAlert}></Alert>)}
    </div>
  );
};

export default CardJugadores;
