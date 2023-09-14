import React from 'react'

export const Item = ({links, title}) => {
  return (
    <div>
        <ul>
            <h1 className='mb-1 font-bold text-xl'>{title}</h1>
            {   
                links.map((link)=>(
                    <li key={link.name}>
                        <a className='text-gray-400 hover:text-orange-400 duration-300
                            text-sm-cursor-pointer leading-6' 
                            href={link.link}>
                                {link.name}
                        </a>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
