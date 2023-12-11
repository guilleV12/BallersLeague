import React, { useState } from 'react'
import { BotonAsignarArbitros, BotonContenido, BotonFiltros } from '../BotonesAcciones';
import TablaPaginadaPlayoffs from './TablaPaginadaPlayoffs';
import { ModalCrearPlayoffs } from './ModalCrearPlayoffs';
import ModalEliminarFixture from '../Fixture/ModalEliminarFixture';
import ModalAsignarArbitros from '../Fixture/ModalAsignarArbitros';
import ModalInformarErrores from '../Modales/ModalInformarErrores';
import Dropdown from '../Dropdown';

export const TabPlayoffs = ({
    playoffs,
    jugadorPartido, 
    partidos,
    partidosPlayoffs, 
    jugadores, 
    arbitros, 
    calendario, 
    fechas, 
    equipos, 
    liga, 
    patrocinadorConPrioridad,
    campeon,
    users, 
    user, 
    setShowAlert, 
    setTituloAlert,
    rol,
    fechasPlayoffs
}) => {
    const [isGenerarPlayOffOpen, setGenerarPlayOffOpen] = useState(false);
    const [isDeleteFixtureOpen, setDeleteFixtureOpen] = useState(false);
    const [isModalAsignarArbitroOpen, setIsModalAsignarArbitroOpen] = useState(false);
    const [isModalInformarErrorFixtureOpen, setIsModalInformarErrorFixtureOpen] = useState(false);
    const [filtro, setFiltro] = useState('');

    const openModalInformarErrorFixture = () => {
        setIsModalInformarErrorFixtureOpen(true);
      };

    const closeModalInformarErrorFixture = () => {
        setIsModalInformarErrorFixtureOpen(false);
      };

    const handleAsignarArbitros = () => {
        setIsModalAsignarArbitroOpen(true);
      };

    const handleCloseAsignarArbitros = () => {
        setIsModalAsignarArbitroOpen(false);
      };

    const closeGenerarPlayoffModal = () => {
        setGenerarPlayOffOpen(false);
    };

    const handleDeleteFixture = () => {
        setDeleteFixtureOpen(true);
      };
    
      const handleCloseDeleteFixture = () => {
        setDeleteFixtureOpen(false);
      };

  return (
    <div className="tab-playoffs">
        <div className="botones-accion flex w-full justify-end md:justify-center md:space-x-4 md:py-5 bg-black">
            <div className='hidden md:flex w-[50%] pl-2'>
            {fechasPlayoffs&&(fechasPlayoffs.length > 0 ? (
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
            <div className='flex w-[50%] justify-end pr-2'>
                {(user && user.id === liga.user_id) &&(
                    fechasPlayoffs&&(
                        fechasPlayoffs.length > 0 &&(
                        <BotonAsignarArbitros 
                            onClick={handleAsignarArbitros}
                            className={''} 
                            />
                        )
                    )
                )
                }
                {partidosPlayoffs ? ((partidosPlayoffs.length == 0)&&(
                    (user && user.id === liga.user_id) &&(
                        <BotonContenido
                            nombre={fechasPlayoffs ? (
                                        (fechasPlayoffs.length>0)?
                                            'Regenerar playoffs':'Generar playoffs' )
                                                : ('Generar playoffs')}
                            onClick={() => {setGenerarPlayOffOpen(true)}}
                            className={'ml-2'}
                            />
                    )
                )) : 
                    (user && user.id === liga.user_id) &&(
                        <BotonContenido
                            nombre={'Generar playoffs'}
                            onClick={() => {setGenerarPlayOffOpen(true)}}
                            className={'ml-2'}
                            />
                    )
                }
                {fechasPlayoffs&&(
                    fechasPlayoffs.length > 0 &&(
                        ((user && user.id === liga.user_id) || rol === 'admin') &&(
                            <BotonContenido
                                className={'ml-2'}
                                nombre={'Eliminar playoffs'}
                                onClick={partidosPlayoffs&&(partidosPlayoffs.length > 0 ? (rol ? (rol === 'admin' ? handleDeleteFixture : openModalInformarErrorFixture) : openModalInformarErrorFixture) : handleDeleteFixture)}
                                />
                        )
                    )
                )}
            </div>
        </div>

        {playoffs ? (
            <TablaPaginadaPlayoffs
                jugadorPartido={jugadorPartido}
                partidos={partidos}
                partidosPlayoffs={partidosPlayoffs}
                jugadores={jugadores}
                fechas={fechasPlayoffs}
                equipos={equipos}
                arbitros={arbitros}
                rol={rol}
                patrocinadorConPrioridad={patrocinadorConPrioridad}
                filtro={filtro}
                liga={liga}
                users={users}
                user={user}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}
                />
        ):(
            <div className='flex w-full h-20 justify-center items-center'>
                No se han generado cruces de playoffs.
            </div>
        )}



        {isGenerarPlayOffOpen && (
            <ModalCrearPlayoffs
            equipos={equipos}
            calendario={calendario}
            fechas={fechas}
            liga={liga}
            closeGenerarPlayoffModal={closeGenerarPlayoffModal}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            playoffs={playoffs}
            partidos={partidos}
            campeon={campeon}
            fechasPlayoffs={fechasPlayoffs}
            />
      )}
       {isDeleteFixtureOpen && (
            <ModalEliminarFixture 
            onDelete={handleCloseDeleteFixture}
            onCancel={handleCloseDeleteFixture}
            calendario={playoffs}
            caledario={playoffs}
            esPlayoff={true}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            fechas={fechasPlayoffs}
            liga={liga}
            rol={rol}
            />
      )}

    {isModalAsignarArbitroOpen && (
        <ModalAsignarArbitros
          calendario={playoffs}
          arbitros={arbitros}
          esPlayoff={true}
          liga={liga}
          fechas={fechasPlayoffs}
          closeModalAsignarArbitros={handleCloseAsignarArbitros}
          setShowAlert={setShowAlert}
          setTituloAlert={setTituloAlert}
        />
      )}

    {isModalInformarErrorFixtureOpen && (
        <ModalInformarErrores
          titulo={'Ya se jugo un partido!'}
          cuerpo={'Debe contactarse con el administrador para borrar o regenerar estos playoffs.'} 
          nombre={'Cerrar'}
          closeModal={closeModalInformarErrorFixture}
          />
      )}
    </div>

  )
}
export default TabPlayoffs;