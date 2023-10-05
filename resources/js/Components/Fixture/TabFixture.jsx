import React from 'react'
import TablaFixture from './TablaFixture';
import PrimaryButton from '../PrimaryButton';

export const TabFixture = ({ calendario, fechas, equipos, arbitros }) => {
  return (
    <div className='flex justify-center'>
        <TablaFixture fechas={fechas} equipos={equipos} arbitros={arbitros}/>
    
    </div>
  )
}
export default TabFixture;