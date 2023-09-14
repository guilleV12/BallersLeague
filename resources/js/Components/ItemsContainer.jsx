import React from 'react'
import { Item } from './Item'
import { InfoContacto, NavegacionNoAuth, RedesSociales } from './Footer/menu'

export const ItemsContainer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:px-8 text-center py-16'>
        <Item links={InfoContacto} title='Contacto'/>
        <Item links={NavegacionNoAuth} title='Navegacion'/>
        <Item links={RedesSociales} title='Redes sociales'/>
    </div>
  )
}
