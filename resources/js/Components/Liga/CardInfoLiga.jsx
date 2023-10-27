import React from 'react';

function LeagueInfoCard({ liga, userAdmin, className }) {
    const date = new Date(liga.created_at);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // El mes es de 0 a 11
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

  return (
                <div className="w-full flex justify-center overflow-x-auto shadow-lg shadow-gray-500 rounded-lg border border-gray-400">
                        <table className="w-full flex-col text-left text-black dark:text-gray-400">
                                <caption className='bg-orange-500 text-white text-xl font-semibold py-5'>Informacion</caption>
                                <tbody>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Nombre:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {liga.nombre}.
                                            </td>  
                                    </tr>
                                    <tr className="grid md:flex border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Descripcion:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {liga.descripcion}.
                                            </td>
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ubicacion:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {liga.ubicacion}.
                                            </td>
                                    </tr>
                                    <tr className="grid md:flex border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Creacion:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {formattedDate}.
                                            </td>
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Categoria:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {liga.categoria}.
                                            </td>
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Administrador:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {`${userAdmin.nombre} ${userAdmin.apellido}`}.
                                            </td>
                                    </tr>
                                    <tr className="grid md:flex bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="text-base md:w-[50%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Contacto:
                                            </th>
                                            <td className="px-6 py-4 text-sm text-right md:text-left md:w-[50%]">
                                                {userAdmin.email}.
                                            </td>
                                    </tr>
                                </tbody>
                        </table>
                </div>
  );
}

export default LeagueInfoCard;