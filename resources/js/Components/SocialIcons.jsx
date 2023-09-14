import React from 'react'

export const SocialIcons = ({icons}) => {
  return (
    <div className='text-orange-500'>
        {
            icons.map(icon =>(
                <span key={icon.name} className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700
                    mx-1.5 text-xl hover:text-gray-100 hover:bg-orange-500 duration-300'>
                    <ion-icon name={icon.name}></ion-icon>
                </span>
            ))
        }
    </div>
  )
}
