import React from 'react';

function LeagueInfoCard({ liga, userAdmin, className }) {
    // Crear un objeto de fecha a partir del timestamp
    const date = new Date(liga.created_at);

    // Obtener las partes de la fecha (año, mes y día)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // El mes es de 0 a 11
    const day = date.getDate().toString().padStart(2, "0");

    // Formatear la fecha como "YYYY-MM-DD"
    const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className={`${className}`}>
      <div className="flow-root">
        
        <div className="w-full flex justify-center overflow-x-auto shadow-xl sm:rounded-lg border border-gray-200">
            <table className="w-full text-2xl text-left text-gray-500 dark:text-gray-400">
                <caption className='bg-orange-500 text-white font-extrabold py-5'>Informacion de liga</caption>
                <tbody>
                    <tr className="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700 justify-around">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Nombre:
                        </th>
                        <td className="px-6 py-4">
                            {liga.nombre}
                        </td>
                        
                    </tr>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Descripcion:
                        </th>
                        <td className="px-6 py-4">
                            {liga.descripcion}
                        </td>
                       
                    </tr>
                    <tr className="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Ubicacion:
                        </th>
                        <td className="px-6 py-4">
                            {liga.ubicacion}
                        </td>
                    </tr>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Creacion:
                        </th>
                        <td className="px-6 py-4">
                            {formattedDate}
                        </td>
                    </tr>
                    <tr className="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Administrador:
                        </th>
                        <td className="px-6 py-4">
                            {`${userAdmin.nombre} ${userAdmin.apellido}`}
                        </td>
                    </tr>
                    <tr className="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Contacto:
                        </th>
                        <td className="px-6 py-4">
                            {userAdmin.email}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}

export default LeagueInfoCard;
