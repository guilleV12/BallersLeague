import React, { useState } from 'react';
import { BotonAsignarArbitros, BotonRegenerarFixture, BotonEliminarFixture, BotonContenido, BotonFiltros } from '../BotonesAcciones';
import ModalAsignarArbitros from './ModalAsignarArbitros';
import TablaPaginadaFixture from './TablaPaginadaFixture';
import ModalCrearFixture from './ModalCrearFixture';
import ModalEliminarFixture from './ModalEliminarFixture';
import ModalInformarErrores from '../Modales/ModalInformarErrores';
import Dropdown from '../Dropdown';
import ModalFinalizarLiga from './ModalFinalizarLiga';

const TabFixture = ({ 
  jugadorPartido, 
  partidos, 
  jugadores, 
  arbitros, 
  calendario, 
  fechas, 
  equipos, 
  liga, 
  users, 
  patrocinadorConPrioridad,
  user, 
  setShowAlert, 
  setTituloAlert,
  fechasPlayoffs,
  rol,
  campeon 
}) => {
  const [isModalAsignarArbitroOpen, setIsModalAsignarArbitroOpen] = useState(false);
  const [isModalInformarErrorFixtureOpen, setIsModalInformarErrorFixtureOpen] = useState(false);
  const [isGenerarFixtureOpen, setGenerarFixtureOpen] = useState(false);
  const [isDeleteFixtureOpen, setDeleteFixtureOpen] = useState(false);
  const [isFinalizarLigaOpen, setFinalizarLigaOpen] = useState(false);

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

  const openModalInformarErrorFixture = () => {
    setIsModalInformarErrorFixtureOpen(true);
  }

  const closeModalInformarErrorFixture = () => {
    setIsModalInformarErrorFixtureOpen(false);
  }

  const openModalFinalizarLiga = () => {
    setFinalizarLigaOpen(true);
  }

  const closeModalFinalizarLiga = () => {
    setFinalizarLigaOpen(false);
  }

  const [filtro, setFiltro] = useState('');

  return (
    <div className="tab-fixture">
      <div className="botones-accion flex w-full justify-center md:space-x-4 py-5 bg-black">
        <div className='hidden md:flex w-[35%] justify-start pl-2'>
        {fechas&&(fechas.length > 0 ? (
          <>
          <Dropdown>
          <Dropdown.Trigger>
            <button className='mx-2 text-sm inline-flex text-white font-semibold bg-orange-500 rounded-lg p-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition'>
              FILTRAR <span className='text-xl ml-1 font-semibold w-full flex'><ion-icon name="swap-vertical"></ion-icon></span>
            </button> 
          </Dropdown.Trigger>
          <Dropdown.Content align='left'>
              <ul className='p-1'>
                  <li>
                    <BotonContenido
                      nombre={'Todas'}
                      onClick={() => {setFiltro('todas')}}
                      className={'w-full justify-center mb-1'}
                      />
                  </li>
                  <li>
                    <BotonContenido
                      nombre={'Jugados'}
                      onClick={() => {setFiltro('jugados')}}
                      className={'w-full justify-center mb-1'}
                      />
                  </li>
                  <li>
                    <BotonContenido
                      nombre={'No jugados'}
                      onClick={() => {setFiltro('nojugados')}}
                      className={'w-full justify-center'}
                      />
                  </li>
              </ul>
          </Dropdown.Content>
          </Dropdown>
          </>
        ):(''))
        }
        </div>
        <div className='flex w-[65%] justify-end md:space-x-4 pr-2'>
        {((user && user.id === liga.user_id)) ? (
                fechas ? ( fechas.length > 0 ? (
                    <>
                        <BotonAsignarArbitros 
                          onClick={handleAsignarArbitros}
                          className={' mb-1 block justify-center'} 
                          />
                        {partidos&&(partidos.length > 0 ? (
                          ''
                        ):(
                        <BotonRegenerarFixture 
                          onClick={handleGenerarFixture} 
                          regenerar={true}
                          className={' mb-1 block justify-center'}
                          />
                        ))}
                        
                        <BotonEliminarFixture 
                          onClick={partidos&&(partidos.length > 0 ? openModalInformarErrorFixture : handleDeleteFixture)}
                          className={' mb-1 block justify-center'}
                          />
                    
                    {!campeon &&(
                      fechas.length === partidos.length &&(
                        (!fechasPlayoffs)?(
                            <BotonContenido
                              nombre={'Finalizar s/playoffs'}
                              onClick={openModalFinalizarLiga}
                              />
                        ):(
                          fechasPlayoffs.length === 0&&(
                            <BotonContenido
                              nombre={'Finalizar s/playoffs'}
                              onClick={openModalFinalizarLiga}
                              />
                          )
                        )
                          
                      )
                    )}
                    </>
                  ) : (
                      <>
                        <BotonRegenerarFixture 
                          onClick={handleGenerarFixture} 
                          regenerar={false}
                          />
                        
                      </>
                  )
                ) : (
                      <BotonRegenerarFixture 
                        onClick={handleGenerarFixture} 
                        regenerar={false}
                        />
                )
              ):(
                rol === 'admin' && (
                  <BotonEliminarFixture 
                    onClick={handleDeleteFixture}
                    className={' mb-1 block justify-center'}
                    />
                )
              )}
        </div>

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
        patrocinadorConPrioridad={patrocinadorConPrioridad}
        filtro={filtro}
        setShowAlert={setShowAlert}
        setTituloAlert={setTituloAlert}
        rol={rol}
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

      {isFinalizarLigaOpen && (
        <ModalFinalizarLiga
          liga={liga}
          onCancel={closeModalFinalizarLiga}
          onAdd={closeModalFinalizarLiga}
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
          rol={rol}
          />
      )}

      {isModalInformarErrorFixtureOpen && (
        <ModalInformarErrores
          titulo={'Ya se jugo un partido!'}
          cuerpo={'Debe contactarse con el administrador para borrar o regenerar este fixture.'} 
          nombre={'Cerrar'}
          closeModal={closeModalInformarErrorFixture}
          />
      )}
    </div>
  );
};

export default TabFixture;
