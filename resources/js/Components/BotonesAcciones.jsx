import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const BotonAsignarArbitros = ({ onClick, className }) => {
  return (
    <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
      Asignar árbitros
    </PrimaryButton>
  );
};

const BotonRegenerarFixture = ({ onClick, regenerar, className }) => {
  return (
    <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
      {regenerar ? 'Regenerar fixture' : 'Generar fixture'}
    </PrimaryButton>
  );
};

const BotonEliminarFixture = ({ onClick, className }) => {
  return (
    <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
      Eliminar fixture
    </PrimaryButton>
  );
};

const BotonAnadirArbitros = ({ onClick }) => {
    return (
      <PrimaryButton onClick={onClick} className="boton-accion bg-orange-500">
        Añadir árbitro
      </PrimaryButton>
    );
  };

const BotonAnadirEquipos = ({ onClick }) => {
    return (
      <PrimaryButton onClick={onClick} className="boton-accion bg-orange-500">
        Añadir equipos
      </PrimaryButton>
    );
  };

const BotonEliminar = ({ onClick, className }) => {
    return (
      <PrimaryButton onClick={onClick} className={`boton-accion bg-red-600 ${className}`}>
        Eliminar
      </PrimaryButton>
    );
  };

const BotonEditar = ({ onClick, className }) => {
    return (
      <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
        Editar
      </PrimaryButton>
    );
  };

const BotonConfirmarArbitros = ({ onClick, className }) => {
    return (
      <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
        Invitacion
      </PrimaryButton>
    );
  };

const BotonCancelar = ({ onClick, className }) => {
    return (
      <SecondaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
        Cancelar
      </SecondaryButton>
    );
  };

const BotonOpciones = ({ onClick, className }) => {
    return (
      <button onClick={onClick} className={`boton-accion border-2 border-orange-500 w-10 h-10 p-0 inline-flex justify-center items-center text-center hover:bg-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition ${className}`}>
          <span className='text-2xl flex justify-center items-center w-full h-full text-orange-500 hover:text-white hover:text-3xl'>
            <ion-icon name="options"></ion-icon>
          </span>
      </button>
    );
  };

const BotonJugadores = ({ onClick, className }) => {
    return (
      <PrimaryButton onClick={onClick} className={`boton-accion bg-orange-500 ${className}`}>
        Jugadores
      </PrimaryButton>
    );
  };

const BotonContenido = ({ onClick, className, nombre }) => {
    return (
      <PrimaryButton onClick={onClick} className={`boton-accion ${nombre === 'Eliminar resultado' ? 'bg-red-600' : 'bg-orange-500'} ${className}`}>
        {nombre}
      </PrimaryButton>
    );
  };

const BotonTab = ({ onClick, className, id, isActive, label }) => {
    return (
      <button
      id={id}
      onClick={onClick}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={isActive}
      className={`inline-block p-4 text-black rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-orange-500' : ''} ${className}`}
    >
      <p className='text-md font-semibold'>{label}</p>
    </button>
    );
  };
export { BotonAsignarArbitros, BotonContenido, BotonRegenerarFixture, BotonEliminarFixture, BotonEditar, BotonAnadirArbitros, BotonTab, BotonAnadirEquipos, BotonEliminar, BotonConfirmarArbitros, BotonCancelar, BotonOpciones, BotonJugadores };
