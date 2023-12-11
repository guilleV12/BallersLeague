import React, { useState, useEffect, useRef } from 'react';
import { BotonContenido } from '../BotonesAcciones';
import ModalCrearVoto from './ModalCrearVoto';
import ModalInformarErrores from '../Modales/ModalInformarErrores';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ModalEliminarVotacion from './ModalEliminarVotacion';
import PrimaryButton from '../PrimaryButton';

const JugadorMasValioso = ({
  setShowAlert,
  setTituloAlert,
  liga,
  jugadores,
  equipos,
  user,
  votosJMV,
  goleadores,
  rol
}) => {
  const [isModalVotarOpen, setModalVotarOpen] = useState(false);
  const [puedeVotar, setPuedeVotar] = useState(false);
  const [isModalInfoOpen, setModalInfoOpen] = useState(false);
  const [jugadorMasValioso, setJugadorMasValioso] = useState(null);
  const [votoEmitido, setVotoEmitido] = useState(false);
  const [isModalVotoEmitidoOpen, setModalVotoEmitidoOpen] = useState(false);
  const [isModalReiniciarVotacionOpen, setModalReiniciarVotacionOpen] = useState(false);
  const cardRef = useRef(null);

  // Verificar si el usuario puede votar
  useEffect(() => {
    const jugadorDelUsuario = user ? jugadores.find((jugador) => jugador.dni === user.dni) : false;
    setPuedeVotar(!!jugadorDelUsuario);
    
    // Buscar jugador mas votado
    if (votosJMV.length > 0) {
        const votosPorJugador = votosJMV.reduce((accumulator, voto) => {
          const jugadorId = voto.jugador_id;
          accumulator[jugadorId] = (accumulator[jugadorId] || 0) + 1;
          return accumulator;
        }, {});
    
        // Encontrar el jugador con más votos
        const jugadoresMasVotadosIds = Object.keys(votosPorJugador).reduce((acc, curr) => {
          if (!acc.length || votosPorJugador[curr] > votosPorJugador[acc[0]]) {
            return [curr];
          } else if (votosPorJugador[curr] === votosPorJugador[acc[0]]) {
            return [...acc, curr];
          }
          return acc;
        }, []);
    
        // Empate en la cantidad de votos, comparar el promedio de goles
        if (jugadoresMasVotadosIds.length > 1) {
          const promediosGoles = jugadoresMasVotadosIds.map((jugadorId) => {
            const goleador = goleadores.find((goleador) => goleador.jugador_id === parseInt(jugadorId));
            return goleador ? goleador.promedio_goles : 0;
          });
    
          const jugadorMasVotadoId = jugadoresMasVotadosIds.reduce((a, b) =>
            promediosGoles[a] > promediosGoles[b] ? a : b
          );
    
          const jugadorMasVotado = jugadores.find((jugador) => jugador.id === parseInt(jugadorMasVotadoId));
          setJugadorMasValioso(jugadorMasVotado);
        } else {
          // No hay empate, encontrar el jugador con más votos
          const jugadorMasVotado = jugadores.find((jugador) => jugador.id === parseInt(jugadoresMasVotadosIds[0]));
          setJugadorMasValioso(jugadorMasVotado);
        }

    /////
    //verificar si el usuario ya voto
    const buscarVoto = user ? votosJMV.find((voto) => voto.user_id === user.id) : null;
    if (buscarVoto){
        setVotoEmitido(true);
    }
  }
  }, [jugadores, user, votosJMV]);

  const openModalVotar = () => {
    setModalVotarOpen(true);
  };
  const closeModalVotar = () => {
    setModalVotarOpen(false);
  };
  const openModalInfo = () => {
    setModalInfoOpen(true);
  };
  const closeModalInfo = () => {
    setModalInfoOpen(false);
  };
  const openModalReiniciar = () => {
    setModalReiniciarVotacionOpen(true);
  };
  const closeModalReiniciar = () => {
    setModalReiniciarVotacionOpen(false);
  };

  const generarPDF = async () => {
    const doc = new jsPDF();

    // Imagen en la esquina superior derecha
    const logoDerecha = new Image();
    logoDerecha.src = '/images/TPFL.png';
    doc.addImage(logoDerecha, 'png', doc.internal.pageSize.width - 40, 8, 35, 26);

    // Imagen en la esquina superior izquierda
    const logoIzquierda = new Image();
    logoIzquierda.src = `/images/`+liga.logo;
    doc.addImage(logoIzquierda, 'png', 5, 5, 35, 35);

    doc.text('Jugador mas valioso', 80, 45);

    if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current);
        const imageData = canvas.toDataURL('image/png');
  
        // Ajustar el tamaño de la imagen según tus necesidades
        doc.addImage(imageData, 'PNG', 35, 50, 150, 65);
      }

      
    // Pie de página
    doc.setFontSize(12);
    doc.text(`Liga: ${liga.nombre}.`, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, { align: 'right' });

    // Guardar el PDF (puedes cambiar 'output.pdf' al nombre que prefieras)
    doc.save('JugadorMasValioso_'+liga.nombre+'.pdf');
  };
  
  return (
    <div className={`w-full pb-10 ${jugadorMasValioso?``:`pt-1`}`}>
        {jugadorMasValioso && (
            <div className='w-full bg-black mb-5 pb-1 pr-4 flex justify-end'>
                <button 
                onClick={generarPDF}
                title='descargar jugador mas valioso'
                alt='descargar jugador mas valioso'
                className={`boton-accion font-semibold p-1 border-2 border-orange-500 w-fit h-10 inline-flex justify-center items-center text-white text-center bg-orange-500 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition`}>
                <span className='text-3xl p-1'><ion-icon name="download-outline"></ion-icon></span>
                </button>
            </div>
        )}
      
      <div className='w-full flex pl-5 mb-10 space-x-1'>
        {puedeVotar ? (
          <BotonContenido 
          nombre={<span className='flex-inline items-center'>Votar<span className='flex-inline ml-1 items-center'><ion-icon name="star"></ion-icon></span></span>} 
          onClick={() => {votoEmitido ? setModalVotoEmitidoOpen(true) : openModalVotar()}} />
        ) : (
            <button type="button" onClick={openModalInfo} className="inline-flex justify-center items-center w-10 h-10 text-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <span className="flex justify-center items-center text-3xl ">
                    <ion-icon name="information-circle-outline"></ion-icon>
                </span>
            </button>
        )}
        {(rol === 'admin' && votosJMV.length>0) && (
            <BotonContenido
                nombre={'Reiniciar votacion'}
                onClick={openModalReiniciar}
                />
        )}
      </div>
      <div className='w-full flex justify-center'>
            {jugadorMasValioso ? (
                <div className='flex-col justify-center w-[30%]'>
                <PrimaryButton disabled={true} className='w-fit flex justify-center bg-orange-500 hover:bg-orange-600 hover:text-white rounded-b-none'>Jugador mas valioso</PrimaryButton>
                <div className='w-full border rounded-b-lg rounded-r-lg shadow-lg flex shadow-orange-500' ref={cardRef} id='jugadorMasValioso'>
                    <div className='w-[50%] h-40 rounded-full bg-white flex justify-start items-center'>
                        <img src={`/images/${jugadorMasValioso.foto_perfil}?${new Date().getTime()}`} alt={`jugador mas votado`} title='jugador mas votado' className="h-28 w-auto rounded-full"/>
                    </div>
                    <div className='w-[50%] h-40 rounded-full bg-white flex flex-col justify-center'>
                        <span className='text-lg'>{jugadorMasValioso.nombre+' '+jugadorMasValioso.apellido}</span>
                        <img src={`/images/${equipos.find((equipo) => equipo.id === jugadorMasValioso.equipo_id).logo}?${new Date().getTime()}`} className="h-10 w-10 rounded-full"/>
                        <span className='text-sm text-gray-600'>Puntos por partido: {goleadores.find((goleador) => goleador.jugador_id === jugadorMasValioso.id).promedio}.</span>
                        <span className='text-sm text-gray-600'>Puntos totales: {goleadores.find((goleador) => goleador.jugador_id === jugadorMasValioso.id).puntos}.</span>
                        <span className='text-sm text-gray-600'>Partidos jugados: {goleadores.find((goleador) => goleador.jugador_id === jugadorMasValioso.id).cantidad_partidos}.</span>

                    </div>
                </div>
                </div>
            ):(
                <div className='w-[30%] border rounded-lg shadow-lg py-10 flex justify-center'>
                    Aun no se registran votos...
                </div>
            )}
      </div>
      {isModalVotarOpen && (
            <ModalCrearVoto
            liga={liga}
            user={user}
            onCancel={closeModalVotar}
            onAdd={closeModalVotar}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            accion={'agregar'}
            jugadores={jugadores}
            actionRoute={'jmv.store'}
            equipos={equipos}
            />
      )}
      {
        isModalVotoEmitidoOpen&&(
            <ModalInformarErrores
                titulo={'Ya emitio su voto!'}
                cuerpo={'Solo se puede votar una vez.'}
                nombre={'Entendido'}
                closeModal={() => {setModalVotoEmitidoOpen(false)}}
                left={'left-[50%]'}
                />
        )
      }
      {isModalInfoOpen &&(
        <ModalInformarErrores
            titulo={'Quien puede votar?'}
            cuerpo={'Solo podran votar los jugadores registrados en la liga.'}
            nombre={'Entendido'}
            closeModal={closeModalInfo}
            left={'left-[50%]'}
            />
        )}
      {isModalReiniciarVotacionOpen &&(
        <ModalEliminarVotacion
            onDelete={closeModalReiniciar}
            onCancel={closeModalReiniciar}
            setShowAlert={setShowAlert}
            setTituloAlert={setTituloAlert}
            voto={votosJMV[0]}
            />
      )}
    </div>
  );
};

export default JugadorMasValioso;
