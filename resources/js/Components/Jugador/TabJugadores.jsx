import React, { useState } from 'react';
import TablaPaginadaJugadores from './TablaPaginadaJugadores';
import Alert from '../Alerts/Alert';
import { BotonContenido } from '../BotonesAcciones';

const TabJugadores = ({ user, liga, equipo, jugadores }) => {
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
    <div className="w-[90%] xl:w-full bg-white border border-black rounded-lg shadow-lg shadow-gray-500">
        <div className={`flex w-full ${user.id === liga.user_id ? `justify-between `: `justify-center space-x-5 `} items-center bg-black py-3 px-1 border border-gray-50 rounded-lg`}>
            
            <a href={route('ligas.show',liga.user_id)} className="w-16 md:h-40 md:w-40 flex justify-center items-center rounded-full bg-white">
                <img className="h-auto w-full rounded-full" src={'/images/'+liga.logo}  alt={`Liga: `+liga.nombre} title={`Liga: `+liga.nombre}/>
            </a>
            
            <div className="h-16 w-16 md:h-40 md:w-40 flex justify-center items-center rounded-full bg-white">
                <img className="h-auto w-full rounded-full" src={'/images/'+equipo.logo}  alt={`Liga `+liga.nombre}/>
            </div>
            
            {(user.id === liga.user_id) && (
              <>
              <div className="md:hidden h-16 w-16 flex justify-center items-center rounded-full p-1">
                <BotonContenido 
                  onClick={openAnadirJugadorModal}
                  nombre={<span className='text-xl'><ion-icon name="person-add"></ion-icon></span>}
                  className={' h-full w-full rounded-full justify-center items-center'}
                  />
              </div>
              <div className="hidden md:flex justify-center items-center rounded-full p-1">
              <BotonContenido 
                onClick={openAnadirJugadorModal}
                nombre={'Añadir jugador'}
                className={' flex justify-center items-center'}
                />
              </div>
              </>
            )}
        </div>
        <TablaPaginadaJugadores 
          liga={liga} 
          user={user} 
          equipo={equipo} 
          jugadores={jugadores} 
          isAnadirJugadorOpen={isAnadirJugadorOpen} 
          openAnadirJugadorModal={openAnadirJugadorModal} 
          closeAnadirJugadorModal={closeAnadirJugadorModal} 
          openEditarJugadorModal={openEditarJugadorModal}  
          closeEditarJugadorModal={closeEditarJugadorModal} 
          isEditarJugadorOpen={isEditarJugadorOpen} 
          jugadorEditar={jugadorEditar} 
          openEliminarJugadorModal={openEliminarJugadorModal} 
          closeEliminarJugadorModal={closeEliminarJugadorModal} 
          isEliminarJugadorOpen={isEliminarJugadorOpen} 
          jugadorEliminar={jugadorEliminar} 
          setShowAlert={setShowAlert} 
          setTituloAlert={setTituloAlert}
          />

        {showAlert &&(
          <Alert 
            titulo={tituloAlert} 
            texto={''} 
            tiempo={3000} 
            showAlert={showAlert} 
            icono={'success'} 
            closeAlert={closeAlert}
            />
        )}
    </div>
  );
};

export default TabJugadores;
