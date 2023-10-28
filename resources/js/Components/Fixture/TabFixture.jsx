import React, { useState } from 'react';
import { BotonAsignarArbitros, BotonRegenerarFixture, BotonEliminarFixture } from '../BotonesAcciones';
import ModalAsignarArbitros from './ModalAsignarArbitros';
import TablaPaginadaFixture from './TablaPaginadaFixture';
import ModalCrearFixture from './ModalCrearFixture';
import ModalEliminarFixture from './ModalEliminarFixture';

const TabFixture = ({ jugadorPartido, partidos, jugadores, arbitros, calendario, fechas, equipos, liga, users, user, setShowAlert, setTituloAlert }) => {
  const [isModalAsignarArbitroOpen, setIsModalAsignarArbitroOpen] = useState(false);
  const [isGenerarFixtureOpen, setGenerarFixtureOpen] = useState(false);
  const [isDeleteFixtureOpen, setDeleteFixtureOpen] = useState(false);

  const handleAsignarArbitros = () => {
    setIsModalAsignarArbitroOpen(true);
  };

  const handleCloseAsignarArbitros = () => {
    setIsModalAsignarArbitroOpen(false);
  };

  const handleGenerarFixture = () => {
    setGenerarFixtureOpen(true);
  };

  const handleCloseGenerarFixture = () => {
    setGenerarFixtureOpen(false);
  };

  const handleDeleteFixture = () => {
    setDeleteFixtureOpen(true);
  };

  const handleCloseDeleteFixture = () => {
    setDeleteFixtureOpen(false);
  };

  return (
    <div className="tab-fixture">
      <div className="botones-accion grid md:flex w-full justify-center md:space-x-4 py-5 bg-black">
        {(user.id === liga.user_id) && (
                fechas ? ( fechas.length > 0 ? (
                    <>
                        <BotonAsignarArbitros 
                          onClick={handleAsignarArbitros}
                          className={' mb-1 block justify-center'} 
                          />
                        <BotonRegenerarFixture 
                          onClick={handleGenerarFixture} 
                          regenerar={true}
                          className={' mb-1 block justify-center'}
                          />
                        <BotonEliminarFixture 
                          onClick={handleDeleteFixture}
                          className={' mb-1 block justify-center'}
                          />
                    </>
                  ) : (
                        <BotonRegenerarFixture 
                          onClick={handleGenerarFixture} 
                          regenerar={false}
                          />
                  )
                ) : (
                      <BotonRegenerarFixture 
                        onClick={handleGenerarFixture} 
                        regenerar={false}
                        />
                )
              )}
      </div>

      <TablaPaginadaFixture
        jugadorPartido={jugadorPartido}
        partidos={partidos}
        jugadores={jugadores}
        fechas={fechas}
        equipos={equipos}
        arbitros={arbitros}
        liga={liga}
        users={users}
        user={user}
        setShowAlert={setShowAlert}
        setTituloAlert={setTituloAlert}
      />

      {isModalAsignarArbitroOpen && (
        <ModalAsignarArbitros
          calendario={calendario}
          arbitros={arbitros}
          liga={liga}
          fechas={fechas}
          closeModalAsignarArbitros={handleCloseAsignarArbitros}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}

      {isGenerarFixtureOpen && (
        <ModalCrearFixture
          equipos={equipos}
          calendario={calendario}
          fechas={fechas}
          liga={liga}
          closeGenerarFixtureModal={handleCloseGenerarFixture}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}

      {isDeleteFixtureOpen && (
        <ModalEliminarFixture 
          onDelete={handleCloseDeleteFixture}
          onCancel={handleCloseDeleteFixture}
          calendario={calendario}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
          fechas={fechas}
          caledario={calendario}
          liga={liga}
          />
      )}
    </div>
  );
};

export default TabFixture;
