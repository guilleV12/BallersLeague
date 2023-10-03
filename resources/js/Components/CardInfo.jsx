import React, { useRef } from 'react'
import { Link } from '@inertiajs/react';

export const CardInfo = ({ tipo, user }) => {
    const alerta = useRef(null);
    const hide = () => {
        if (alerta.current) {
            alerta.current.style.display = 'none';
        }
      };
  return (
    <div ref={alerta} id="alert-additional-content-4" className={`px-4 py-10 ${tipo === 'info' ? 
     (`text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800`) : 
     (tipo === 'bienvenido' ? 
     (`text-green-800 border border-green-300 rounded-lg bg-green-50`) : 
     ('text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800')
     )} dark:bg-gray-800 `} role="alert">
        <div className="flex items-center">
            <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">{tipo === 'info' ? ('Info') : ('Error')}</span>
            <h3 className="text-2xl font-medium">
                {tipo === 'info' ? 
                ('Usted no posee una liga.') : 
                (tipo === 'bienvenido' ? 
                ('Bienvenido a ballers league!') : 
                ('Usted ya tiene creada una liga!')
                )
                }
            </h3>
        </div>
        <div className="mt-2 mb-4 text-lg">
            {tipo === 'info' ? 
            ('Puede crear una liga si lo desea. Le recordamos que solo puede tener una liga.') : 
            (tipo === 'bienvenido' ?
            ('Bienvenido a ballers league, puede crear una liga, arbitrar una o seguir cualquier liga que este registrada en nuestro sitio!') :
            ('Le recordamos que por el momento cada usuario solo puede tener una liga.')
            )
            }
            
        </div>
        <div className="flex">
            {tipo === 'info' ? 
            (<button type="button" onClick={hide} className='text-yellow-800 border-yellow-800 hover:bg-yellow-900 focus:ring-yellow-300 dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800 bg-transparent border hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-3 py-1.5 text-center  data-dismiss-target="#alert-additional-content-4' aria-label='Close'>
                Cerrar mensaje
             </button>
            ) :
            (tipo !== 'bienvenido' ? 
            (<Link href={route('ligas.show',[user.id])} method='get' as='button' type='button' className='text-red-800 bg-transparent border 
            border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
              text-lg px-5 py-3 mt-3 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white 
              dark:focus:ring-red-800'>Ir a mi liga</Link>) :
              (<Link href={route('ligas.index')} method='get' as='button' type='button' className='text-green-800 bg-transparent border 
              border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg 
                text-lg px-5 py-3 mt-3 text-center'>Ver ligas</Link>)
            )
            }
            
        </div>
    </div>
  )
}

export default CardInfo;