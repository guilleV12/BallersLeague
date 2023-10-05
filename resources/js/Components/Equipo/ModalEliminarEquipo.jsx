import React from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

const ModalEliminarEquipo = ({ fechas, equipo , onDelete, onCancel, className, setShowAlert, setTituloAlert }) => {
console.log(fechas);
  const handleDelete = () => {
    router.post(route('equipos.destroy', equipo.id), {
       _method: 'delete',
    },{
      onSuccess: ()=> {
          setShowAlert(true);
          setTituloAlert('Equipo eliminado con exito!');
          onDelete(); 
      }
  })
  };

  return (
    <div id="delete-confirmation-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto ${className}`}>
        <div className="relative w-full max-w-lg max-h-full shadow-lg border-black border rounded-lg">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                    <h3 className="text-xl font-medium text-white dark:text-white">
                        {fechas ? ( fechas.length > 0 ? 
                        (`Esta seguro que desea eliminar el equipo: ${equipo.nombre}? Sus jugadores tambien seran eliminados y el fixture.`) 
                        : 
                        (`Esta seguro que desea eliminar el equipo: ${equipo.nombre}? Sus jugadores tambien seran eliminados.`))
                        : (`Esta seguro que desea eliminar el equipo: ${equipo.nombre}? Sus jugadores tambien seran eliminados.`)
                        }
                    </h3>
                </div>
                <div className="p-6 space-y-6 bg-white">
                    <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                      {`Esta seguro que desea eliminar a ${equipo ? equipo.nombre : ''}?`}
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <PrimaryButton className='' onClick={handleDelete}>Eliminar</PrimaryButton>
                    <SecondaryButton className='hover:bg-red-400' onClick={onCancel}>Cancelar</SecondaryButton>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ModalEliminarEquipo;
