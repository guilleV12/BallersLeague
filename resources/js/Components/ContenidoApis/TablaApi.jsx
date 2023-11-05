import React, { useState } from 'react';
import { BotonContenido } from '../BotonesAcciones';
import ModalEstadisticasApi from './ModalEstadisticasApi';


const TablaApi = ({ 
  partidos
 }) => {
  const [isModalEstadisticasOpen, setModalEstadisticasOpen] = useState(false);
  const [partidoVer, setPartidoVer] = useState('');

  return (
    <>
    <table className="text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-base text-left font-semibold text-white bg-black dark:bg-gray-700 dark:text-gray-400 w-full">
              <tr className='grid grid-cols-6 w-full'>
                <th scope="col" className="justify-start py-1 pl-3">
                  Local
                </th>
                <th scope="col" className="justify-start py-1">
                  Puntaje
                </th>
                <th></th>
                <th scope="col" className="flex justify-end py-1">
                  Puntaje
                </th>
                <th scope="col" className='flex justify-end py-1 pr-3'>
                  Visitante
                </th>
                <th></th>
              </tr>
          </thead>
          <tbody className='bg-white'>
          {partidos.map((partido) => (
            <tr key={partido.id} className='grid grid-cols-6 py-1 border-b text-black'>
              <td className='pl-3 flex items-center'>
                {partido.home_team.full_name}
              </td>
              <td className='flex items-center'>
                {partido.home_team_score}
              </td>
              <td className='flex justify-center items-center'>
                vs
              </td>
              <td className='flex justify-end items-center'>
                {partido.visitor_team_score}
              </td>
              <td className='flex justify-end pr-3 items-center'>
                {partido.visitor_team.full_name}
              </td>
              <td className='flex justify-center items-center'>
                <BotonContenido
                  nombre={'+ info'}
                  onClick={() => {setModalEstadisticasOpen(true);setPartidoVer(partido)}}
                  />
              </td>
            </tr>
          ))}
          </tbody>
    </table>
    {isModalEstadisticasOpen&&(
      <ModalEstadisticasApi
        closeModal={() => {setModalEstadisticasOpen(false);}}
        partido={partidoVer}
      />
    )}
    </>
  );
};

export default TablaApi;