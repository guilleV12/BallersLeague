import React, { useState } from 'react'
import PrimaryButton from '../PrimaryButton';
import ModalAsignarArbitros from './ModalAsignarArbitros';
import TablaPaginadaFixture from './TablaPaginadaFixture';

export const TabFixture = ({ jugadorPartido, partidos, jugadores, arbitros, calendario, fechas, equipos, liga, users, user, setShowAlert, setTituloAlert, openDeleteFixtureModal, openGenerarFixtureModal }) => {
  const [isModalAsignarArbitroOpen, setIsModalAsignarArbitroOpen] = useState(false);

  const openModalAsignarArbitro = () => {
    setIsModalAsignarArbitroOpen(true);
  };

  const closeModalAsignarArbitro = () => {
    setIsModalAsignarArbitroOpen(false);
  };
  return (
    <div className='w-full shadow-md h-min-screen'>
      <div className='flex w-full justify-center bg-black pt-1 space-x-2 '>
            {(user.id === liga.user_id) && (
              fechas ? ( fechas.length > 0 ? (
                  <>
                    <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openModalAsignarArbitro}>
                      Asignar arbitros
                    </PrimaryButton>
                    <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openGenerarFixtureModal}>
                      Regenerar fixture
                    </PrimaryButton>
                    <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openDeleteFixtureModal}>
                      Eliminar fixture
                    </PrimaryButton>
                  </>
                ) : (
                    <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openGenerarFixtureModal}>
                      Generar fixture
                    </PrimaryButton>
                )
              ) : (
                    <PrimaryButton className='bg-orange-500 text-xl my-3 hover:bg-orange-600 hover:text-white py-4' onClick={openGenerarFixtureModal}>
                      Generar fixture
                    </PrimaryButton>
              )
            )}
            
        </div>
        <TablaPaginadaFixture jugadorPartido={jugadorPartido} partidos={partidos} jugadores={jugadores} openDeleteFixtureModal={openDeleteFixtureModal} openGenerarFixtureModal={openGenerarFixtureModal} fechas={fechas} equipos={equipos} arbitros={arbitros} liga={liga} users={users} user={user} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>
        {isModalAsignarArbitroOpen &&( <ModalAsignarArbitros calendario={calendario} arbitros={arbitros} fechas={fechas} closeModalAsignarArbitros={closeModalAsignarArbitro} setShowAlert={setShowAlert} setTituloAlert={setTituloAlert}/>)}
    </div>
  )
}
export default TabFixture;