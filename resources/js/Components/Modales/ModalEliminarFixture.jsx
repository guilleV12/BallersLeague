import React from 'react'
import PrimaryButton from '../PrimaryButton';

export const ModalEliminarFixture = ({accion}) => {
  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-50"></div>
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full shadow-lg border-black border rounded-lg z-50 `}>
        <div className="relative w-full max-w-full max-h-full rounded-lg">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-center p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-white dark:text-white">
                    Agregar equipo
                </h3>
            </div>
            <div className="p-6 space-y-6 bg-white">
                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                    Agregar un equipo ahora eliminara el fixture, las tablas y partidos jugados.
                </p>
            </div>
            <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <PrimaryButton className='' onClick={accion}>Entendido</PrimaryButton>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default ModalEliminarFixture;