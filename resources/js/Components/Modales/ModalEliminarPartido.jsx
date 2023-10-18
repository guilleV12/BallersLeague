import React from 'react'

export const ModalEliminarPartido = ({}) => {
  return (<>
            <div className="flex w-full items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-white dark:text-white">
                    Eliminar resultado
                </h3>
            </div>
            <div className="p-6 space-y-6 bg-white">
                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                    El partido se eliminara, y se cambiaran los puntos registrados tanto por equipo como jugadores. Podra volver a cargar el resultado si lo desea.
                </p>
            </div>
           </>
  )
}
export default ModalEliminarPartido;