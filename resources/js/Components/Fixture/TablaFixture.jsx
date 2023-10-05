import React from 'react'

export const TablaFixture = ({ fechas, equipos, arbitros }) => {
  return (
    <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
    <thead className=" text-lg text-left font-bold text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
        <tr className='grid grid-cols-6'>
            <th scope="col" className="px-6 py-1 flex items-center justify-start">
                Fecha
            </th>
            <th scope="col" className="px-6 py-1 flex items-center justify-start">
                Horario
            </th>
            <th scope="col" className=" py-1 flex items-center justify-start">
                Equipo local
            </th>
            <th scope="col" className=" py-1 flex items-center justify-start">
                Equipo visitante
            </th>
            <th scope='col' className='pl-10 py-1 flex items-center justify-start'>
                Arbitros
            </th>
            <th scope="col" className='pr-1 py-1 flex items-center justify-end'>
                ACCION
            </th>
        </tr>
    </thead>
    <tbody>
        {fechas &&(fechas.map((fecha, index) => (
            <tr key={index} className='grid grid-cols-6 py-2'>
                <td scope="col" className="px-6 py-1 flex items-center justify-start">
                    {fecha.fecha ? fecha.fecha : 'No definida'}
                </td>
                <td scope="col" className="px-6 py-1 flex items-center justify-start">
                    {fecha.horario ? fecha.horario : 'No definido'}
                </td>
                <td scope="col" className="px-6 py-1 flex items-center justify-start">
                    {equipos &&(equipos.map((equipo)=>(
                        equipo.id === fecha.equipo_1 ? equipo.nombre : ''
                    )))}
                </td>
                <td scope="col" className="px-6 py-1 flex items-center justify-start">
                    {equipos &&(equipos.map((equipo)=>(
                        equipo.id === fecha.equipo_2 ? equipo.nombre : ''
                    )))}
                </td>
                <td scope='col' className='pl-10 py-1 flex items-center justify-start'>
                    {arbitros &&(arbitros.map((arbitro)=>(
                        arbitro.id === fecha.arbitro_1 ? (
                            users.map((user) => (
                                arbitro.id_user === user.id ? (user.nombre+' '+user.apellido) : ''
                            ))
                        ) : 'No definido '
                    )))}/
                    <br/>
                    {arbitros &&(arbitros.map((arbitro)=>(
                        arbitro.id === fecha.arbitro_2 ? (
                            users.map((user) => (
                                arbitro.id_user === user.id ? (user.nombre+' '+user.apellido) : ''
                            ))
                        ) : ' No definido'
                    )))}
                </td>
                <td scope="col" className='px-6 py-1 flex items-center justify-start'>
                {/* Aquí puedes agregar acciones para esta fecha si es necesario */}
                </td>
            </tr>
            )))}
    </tbody>
    </table>
  )
}
export default TablaFixture;