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
        <div className="botones-accion grid md:flex w-full justify-center md:space-x-4 py-5 bg-black">
            <div className='flex w-[50%] pl-2'>
            {fechasPlayoffs&&(fechasPlayoffs.length > 0 ? (
                <>
                <Dropdown>
                <Dropdown.Trigger>
                    <BotonFiltros
                    nombre={'Filtrar'}
                    className={''}
                    />
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
                {fechasPlayoffs&&(
                    fechasPlayoffs.length > 0 &&(
                    <BotonAsignarArbitros 
                        onClick={handleAsignarArbitros}
                        className={''} 
                        />
                    )
                )}
                {partidosPlayoffs ? ((partidosPlayoffs.length == 0)&&(
                    <BotonContenido
                        nombre={fechasPlayoffs ? (
                                    (fechasPlayoffs.length>0)?
                                        'Regenerar playoffs':'Generar playoffs' )
                                            : ('Generar playoffs')}
                        onClick={() => {setGenerarPlayOffOpen(true)}}
                        className={'ml-2'}
                        />
                )) : <BotonContenido
                        nombre={'Generar playoffs'}
                        onClick={() => {setGenerarPlayOffOpen(true)}}
                        className={'ml-2'}
                        />
                }
                {fechasPlayoffs&&(
                    fechasPlayoffs.length > 0 &&(
                        <BotonContenido
                            className={'ml-2'}
                            nombre={'Eliminar playoffs'}
                            onClick={partidosPlayoffs&&(partidosPlayoffs.length > 0 ? openModalInformarErrorFixture : handleDeleteFixture)}
                            />
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
          cuerpo={'Debe contactarse con el administrador para borrar o regenerar este fixture.'} 
          nombre={'Cerrar'}
          closeModal={closeModalInformarErrorFixture}
          />
      )}
    </div>

  )
}
export default TabPlayoffs;