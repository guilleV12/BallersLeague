import React, { useEffect, useState } from 'react';
import Paginacion from '../Paginacion/Paginacion';
import Dropdown from '../Dropdown';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { BotonContenido, BotonFiltros } from '../BotonesAcciones';
import SecondaryButton from '../SecondaryButton';

const TablaPaginadaGoleadores = ({ liga, user, goleadores, jugadores, equipos}) => {
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
    if (goleadores) {
      let sortedData = [...goleadores];
      if (filtro === 'menor') {
        sortedData.sort((a, b) => a.promedio - b.promedio);
      } else {
        sortedData.sort((a, b) => b.promedio - a.promedio);
      }
      setSortedData(sortedData);
  
    }
  }, [filtro, goleadores]);
  
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

    doc.text('Goleadores', 90, 45);

    

    autoTable(doc, {
      head: [['Jugador', 'Nombre', 'Equipo', 'Promedio', 'Puntos totales', 'Partidos jugados']],
      body: sortedData.map((jugador) =>[
        {
          content: ''
        },
        {
          content: jugadores.find((jugadorB) => jugadorB.id === jugador.jugador_id).nombre+' '+jugadores.find((jugadorB) => jugadorB.id === jugador.jugador_id).apellido,
          styles: { valign: 'middle' },
        },
        {
          content:''
        },
        {
          content: jugador.promedio,
          styles: { valign: 'middle' },
        },
        {
          content: jugador.puntos,
          styles: { valign: 'middle' },
        },
        {
          content: jugador.cantidad_partidos ? jugador.cantidad_partidos : 0,
          styles: { valign: 'middle' },
        },
      ]),
      headStyles: { fillColor: [255, 87, 34] }, // Establecer el color naranja oscuro al fondo del encabezado
      theme: 'grid', // Puedes cambiar el tema según tus preferencias
      startY: 50,
      margin: {bottom:40},
      columnStyles: {0: {cellWidth: 25, minCellHeight: 25}, 2: {cellWidth: 25, minCellHeight: 25}},
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          const index = data.row.index;
      
          if (index >= 0 && index < sortedData.length) {
            const jugadorId = sortedData[index].jugador_id;
      
            if (jugadorId) {
              const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
      
              if (jugador) {
                const logo = new Image();
                logo.src = `/images/${jugador.foto_perfil}`;
      
                // Ajusta las coordenadas y el tamaño según sea necesario
                const x = data.cell.x + 0;
                const y = data.cell.y + 4;
                const width = 25;
                const height = 20;
      
                doc.addImage(logo, x, y, width, height);
              }
            }
          }
        } else if (data.section === 'body' && data.column.index === 2) {          
          const index = data.row.index;

            if (index >= 0 && index < goleadores.length) {

              const jugadorId = sortedData[index].jugador_id;
          
              if (jugadorId) {
                const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
                const equipo = equipos.find((equipo) => equipo.id === jugador.equipo_id);
          
                if (equipo) {
                  const logo = new Image();
                  logo.src = `/images/${equipo.logo}`;
          
                  // Ajusta las coordenadas y el tamaño según sea necesario
                  const x = data.cell.x + 2;
                  const y = data.cell.y + 2;
                  const width = 20;
                  const height = 20;
          
                  doc.addImage(logo, x, y, width, height);
                }
              
            }
          }
          
        }
      },
    });

    // Pie de página
    doc.setFontSize(12);
    doc.text(`Liga: ${liga.nombre}.`, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, { align: 'right' });

    // Guardar el PDF (puedes cambiar 'output.pdf' al nombre que prefieras)
    doc.save('Goleadores_Liga_'+liga.nombre+'.pdf');
  };

  return (
    <div>
    {currentData ? (
        <>
      <table className=" text-left text-black dark:text-gray-400 w-full rounded-lg shadow">
      <thead className="text-base font-bold text-white bg-black dark:bg-gray-700 dark:text-gray-400 rounded-lg">
        <tr className={`grid grid-cols-7`}>
          <th scope="col" className="flex pt-3 justify-center">
            Jugador
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Nombre
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Equipo
          </th>
          <th scope="col" className='flex justify-center'>
            <Dropdown>
              <Dropdown.Trigger>
                Promedio
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
                          nombre={'Mayor a menor'}
                          onClick={() => {setFiltro('mayor')}}
                          className={'w-full justify-center mb-1'}
                          />
                      </li>
                      <li>
                        <BotonContenido
                          nombre={'Menor a mayor'}
                          onClick={() => {setFiltro('menor')}}
                          className={'w-full justify-center mb-1'}
                          />
                      </li>
                     
                  </ul>
              </Dropdown.Content>
            </Dropdown>
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Puntos totales
          </th>
          <th scope="col" className="hidden md:flex pt-3 justify-center">
            Partidos jugados
          </th>
          <th scope="col" className="ml-auto py-1 pr-4">
            <button 
            onClick={generarPDF} 
            title='descargar tabla de goleadores' alt='descargar tabla de goleadores'
            className={`boton-accion font-semibold py-3 px-1 border-2 border-orange-500 w-fit h-10 inline-flex justify-center items-center text-white text-center bg-orange-500 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition`}>
            <span className='text-3xl p-1'><ion-icon name="download-outline"></ion-icon></span>
              </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentData
          .map((goleador) => (
          <tr key={goleador.id} className={`bg-white border-b grid grid-cols-7 dark:bg-gray-900 dark:border-gray-700 text-sm`}>
            <td scope="row" className="flex items-center justify-center">
            {jugadores
                .filter((jugador) => jugador.id === goleador.jugador_id)
                .map((jugadorFiltrado) => (
                    <img
                    key={jugadorFiltrado.id}
                    src={`/images/${jugadorFiltrado.foto_perfil}?${new Date().getTime()}`}
                    className='w-24 h-auto rounded-full'
                    alt={`Foto jugador ${jugadorFiltrado.nombre+' '+jugadorFiltrado.apellido}`}
                    title={`jugador: ${jugadorFiltrado.nombre+' '+jugadorFiltrado.apellido}`}
                    />
            ))}
            </td>
            <td className="flex items-center justify-center">{jugadores
                .filter((jugador) => jugador.id === goleador.jugador_id)
                .map((jugadorFiltrado) => (
                    jugadorFiltrado.nombre+' '+jugadorFiltrado.apellido
            ))}</td>
            <td scope="row" className="flex items-center justify-center">
            {goleador && jugadores && equipos && (
                <img
                    src={`/images/${equipos.find(equipo => equipo.id === jugadores.find(jugador => jugador.id === goleador.jugador_id)?.equipo_id)?.logo}?${new Date().getTime()}`}
                    className='w-24 h-auto rounded-full'
                    alt={`Foto del equipo`}
                    title={`Equipo: ${equipos.find(equipo => equipo.id === jugadores.find(jugador => jugador.id === goleador.jugador_id)?.equipo_id)?.nombre}`}
                />
            )}
            </td>
            <td className="flex items-center justify-center">{goleador.promedio}</td>
            <td className='flex items-center justify-center'>{goleador.puntos}</td>
            <td className='flex items-center justify-center'>{goleador.cantidad_partidos}</td>

          </tr>
        ))}
      </tbody>
    </table>

      <Paginacion 
        itemsPerPage={5}
        startIndex={startIndex} 
        endIndex={endIndex} 
        elemento={goleadores}
        elementoNombre={'Goleadores'}
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

export default TablaPaginadaGoleadores;
