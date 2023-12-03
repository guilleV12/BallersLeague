import React, { useEffect, useState } from 'react';
import Paginacion from '../Paginacion/Paginacion';
import Dropdown from '../Dropdown';
import { BotonContenido, BotonOpciones } from '../BotonesAcciones';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';

const TablaPaginadaPosiciones = ({ liga, user, tablaPosiciones, equipos}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedData, setSortedData] = useState('');

  // Calcular el índice de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Datos a mostrar en la página actual
  const currentData = sortedData.slice(startIndex, endIndex);

  // Manejar el cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    if (tablaPosiciones) {
      let sortedData = [...tablaPosiciones];
      if (filtro === 'ultimo') {
        sortedData.sort((a, b) => b.posicion - a.posicion);
      } else {
        sortedData.sort((a, b) => a.posicion - b.posicion);
      }
      setSortedData(sortedData);
  
    }
  }, [filtro, tablaPosiciones]);

  const generarPDF = () => {
    const doc = new jsPDF();

    // Imagen en la esquina superior derecha
    const logoDerecha = new Image();
    logoDerecha.src = '/images/TPFL.png';
    doc.addImage(logoDerecha, 'png', doc.internal.pageSize.width - 40, 8, 35, 26);

    // Imagen en la esquina superior izquierda
    const logoIzquierda = new Image();
    logoIzquierda.src = `/images/`+liga.logo;
    doc.addImage(logoIzquierda, 'png', 5, 5, 35, 35);

    doc.text('Tabla de Posiciones', 80, 45);

    autoTable(doc, {
      head: [['Posicion', 'Equipo', 'Nombre', 'Ganados', 'Perdidos', 'Puntos a favor']],
      body: sortedData.map((equipoPosicion) => [
        {
          content: equipoPosicion.posicion,
          styles: { valign: 'middle' },
        },
        '',
        {
          content: equipos.find((equipo) => equipo.id === equipoPosicion.equipo_id).nombre || '',
          rowSpan: 1, // El número de celdas a fusionar verticalmente
          styles: { valign: 'middle' },
        },
        {
          content: equipoPosicion.ganados,
          styles: { valign: 'middle' },
        },
        {
          content: equipoPosicion.perdidos,
          styles: { valign: 'middle' },
        },
        {
          content: equipoPosicion.puntos_favor ? equipoPosicion.puntos_favor : 0,
          styles: { valign: 'middle' },
        },
      ]),
      headStyles: { fillColor: [255, 87, 34] }, // Establecer el color naranja oscuro al fondo del encabezado
      theme: 'grid', // Puedes cambiar el tema según tus preferencias
      startY: 50,
      columnStyles: {1: {cellWidth: 20, minCellHeight: 20}},
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {

          const equipoId = sortedData[data.row.index].equipo_id;
          const equipo = equipos.find((equipo) => equipo.id === equipoId);
      
          if (equipo) {
            const logo = new Image();
            logo.src = `/images/${equipo.logo}`;
      
            // Ajusta las coordenadas y el tamaño según sea necesario
            const x = data.cell.x + 2;
            const y = data.cell.y + 2;
            const width = 16;
            const height = 16;

            doc.addImage(logo, x, y, width, height);
          }
          
        }
      },
    });

    // Pie de página
    doc.setFontSize(12);
    doc.text(`Liga: ${liga.nombre}.`, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, { align: 'right' });

    // Guardar el PDF (puedes cambiar 'output.pdf' al nombre que prefieras)
    doc.save('Tabla_Posiciones_Liga_'+liga.nombre+'.pdf');
  };

  return (
    <div>
    {currentData?(
    <>
      <table className=" text-left text-black dark:text-gray-400 w-full rounded-lg shadow pt-2" id='tabla-posiciones'>
      <thead className="text-base font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400 rounded-lg">
        <tr className={`grid grid-cols-3 md:grid-cols-6`}>
          <th scope="col" className="flex justify-center">
          <Dropdown>
              <Dropdown.Trigger>
                  Posicion
                  <button
                  title='filtros' alt='filtros' 
                  className='mx-2 bg-orange-500 rounded-lg p-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition'>
                    <span className='text-2xl w-full flex'><ion-icon name="swap-vertical"></ion-icon></span>
                  </button>
              </Dropdown.Trigger>
              <Dropdown.Content align='left'>
                  <ul className='p-1'>
                      <li>
                        <BotonContenido
                          nombre={'Primero a utlimo'}
                          onClick={() => {setFiltro('primero')}}
                          className={'w-full justify-center mb-1'}
                          />
                      </li>
                      <li>
                        <BotonContenido
                          nombre={'Ultimo a primero'}
                          onClick={() => {setFiltro('ultimo')}}
                          className={'w-full justify-center mb-1'}
                          />
                      </li>
                     
                  </ul>
              </Dropdown.Content>
            </Dropdown>
          </th>
          <th scope="col" className="flex pt-3 justify-center">
            Equipo
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Ganados
          </th>
          <th scope="col" className='hidden md:flex pt-3 justify-center'>
            Perdidos
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Puntos a favor
          </th>
          <th scope="col" className="ml-auto py-1 pr-4">
            <button 
            onClick={generarPDF} 
            title='Descargar tabla posiciones' alt='Descargar tabla posiciones'
            className={`boton-accion font-semibold py-3 px-1 border-2 border-orange-500 w-fit h-10 inline-flex justify-center items-center text-white text-center bg-orange-500 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition`}>
                <span className='text-3xl p-1'><ion-icon name="download-outline"></ion-icon></span>
              </button>
          </th>
          
        </tr>
      </thead>
      <tbody>
        {currentData
          .map((equipoPosicion) => (
          <tr key={equipoPosicion.id} className={`bg-white border-b grid grid-cols-3 md:grid-cols-6 dark:bg-gray-900 dark:border-gray-700 text-sm`}>
            <td className="flex items-center justify-center">{equipoPosicion.posicion}</td>
            <td scope="row" className="flex items-center justify-center">
            {equipos
                .filter((equipo) => equipo.id === equipoPosicion.equipo_id)
                .map((equipoFiltrado) => (
                    <img
                    key={equipoFiltrado.id}
                    src={`/images/${equipoFiltrado.logo}?${new Date().getTime()}`}
                    className='w-24 h-auto rounded-full'
                    alt={`Logo del equipo ${equipoFiltrado.nombre}`}
                    title={`equipo: ${equipoFiltrado.nombre}`}
                    />
            ))}
            </td>
            <td className="hidden md:flex items-center justify-center">{equipoPosicion.ganados}</td>
            <td className='hidden md:flex items-center justify-center'>{equipoPosicion.perdidos}</td>
            <td className="hidden md:flex items-center justify-center">{equipoPosicion.puntos_favor ? equipoPosicion.puntos_favor : 0}</td>
            
          </tr>
        ))}
      </tbody>
    </table>

      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={tablaPosiciones}
        elementoNombre={'Equipos'}
        handlePageChange={handlePageChange} 
        />
    </>
    ):(
        <div className='flex w-full justify-center items-center py-10'>
            La liga todavia no comenzo.
        </div>
        )}
    </div>
  );
};

export default TablaPaginadaPosiciones;
