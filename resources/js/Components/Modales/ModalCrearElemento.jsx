import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import FormsCrearEditar from '../Form/FormsCrearEditar';
import ModalInformarErrores from './ModalInformarErrores';

const ModalCrearElemento = ({
  elementoName,
  actionRoute,
  onCancel,
  onAdd,
  setShowAlert,
  setTituloAlert,
  liga,
  leftPosition,
  formData,
  elemento,
  fechas,
  accion,
  openModalConfirmacionFixture,
  openModalConfirmacionPlayoff,
  regenerar,
  equipos,
  verificarPuntosPartido,
  eliminar,
  equiposFiltrados,
  selectsEquipo1Seleccionado,
  selectsEquipo2Seleccionado,
  jugadores,
  jugadoresEquipo1,
  jugadoresEquipo2,
  handleSelectChange,
  handleSelect2Change,
  classNameModal,
  classNameForm,
  setDataObj,
  patch,
  rol,
  topPosition,
  users,
  arbitros,
  arbitrosSelecto1,
  arbitrosSelecto2,
  setArbitrosSelecto1,
  setArbitrosSelecto2,
  user,
  width,
  fechasPlayoffs
}) => {

  const { data, setData, post, reset, setError, errors } = useForm(formData);
  
  const enviar = () => {
    post(route('calendario.store'), {
        onSuccess: () => {
            reset();
            onCancel();
            setShowAlert(true);
            setTituloAlert('Fixture generado con exito!');
        },
        onError: (response) => {
            setError({ ...errors, ...response });
        },
        });
  };

  const requestData = elementoName === 'Fecha' ? formData : (data);

  const asignarArbitros = () => {
    router.post(route(actionRoute,elemento.id), {
        ...requestData,
        _method: 'put',
        forceFormData: true,
    }, {
    onSuccess: () => {
        setShowAlert(true);
        setTituloAlert(`${elementoName} editado con éxito`);
        onCancel();
    },
    onError: (response) => {
        setError({ ...errors, ...response });
    },
    });
  }

  const [isModalConfirmarPartidoOpen, setModalConfirmarPartidoOpen] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const openModalConfirmacionPartido = () => {
    setModalConfirmarPartidoOpen(true);
  };
  
  const submit = (e) => {
    e.preventDefault();
    if (accion === 'agregar') {
        if (actionRoute === 'calendario.store'){
            if (fechas){
                if (fechas.length > 0){
                    if (!regenerar){
                        openModalConfirmacionFixture();
                        setData({
                            ...data,
                            regenerarFixture: true
                          });
                    } else {
                        enviar();
                    }
                } else {
                    enviar();
                }
            } else {
                enviar();
            }
        }else{
            if (actionRoute === 'partido.store' || actionRoute === 'partidoplayoffs.store'){
                if (verificarPuntosPartido(data)){
                    if (confirmado === true){
                        post(route(actionRoute), {
                            onSuccess: () => {
                            setShowAlert(true);
                            setTituloAlert(`${elementoName} creado con éxito`);
                            reset();
                            onAdd();
                            },
                        });
                    }else{
                        setModalConfirmarPartidoOpen(true);
                    }
                }
            }else{
                if (actionRoute === 'playoffs.store'){
                    if (fechasPlayoffs){
                        if (fechasPlayoffs.length > 0){
                            if (!regenerar){
                                openModalConfirmacionPlayoff();
                                setData({
                                    ...data,
                                    regenerarPlayoffs: true
                                });
                            }else{
                                post(route(actionRoute), {
                                    onSuccess: () => {
                                    setShowAlert(true);
                                    setTituloAlert(`${elementoName} creado con éxito`);
                                    reset();
                                    onAdd();
                                    },
                                });
                            }
                        }else{
                            post(route(actionRoute), {
                                onSuccess: () => {
                                setShowAlert(true);
                                setTituloAlert(`${elementoName} creado con éxito`);
                                reset();
                                onAdd();
                                },
                            });
                        }
                    }else{
                        post(route(actionRoute), {
                            onSuccess: () => {
                            setShowAlert(true);
                            setTituloAlert(`${elementoName} creado con éxito`);
                            reset();
                            onAdd();
                            },
                        });
                    }
                }else{
                    post(route(actionRoute), {
                        onSuccess: () => {
                        setShowAlert(true);
                        setTituloAlert(`${elementoName} creado con éxito`);
                        reset();
                        onAdd();
                        },
                    });
                }
            }
        }
    } else if (accion === 'editar') {
        
        if (elementoName === 'Fechas'){
            asignarArbitros();
        }else{
            router.post(route(actionRoute,elemento.id), {
                ...requestData,
                _method: (patch && patch===true?'patch':'put'),
                forceFormData: true,
            }, {
            onSuccess: () => {
                setShowAlert(true);
                setTituloAlert(`${elementoName} editado con éxito`);
                onCancel();
            },
            onError: (response) => {
                setError({ ...errors, ...response });
            },
            });
        }
    }
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[70] bg-black opacity-50"></div>

      {/* Modal */}
      <div className={`fixed z-[74] ${topPosition?topPosition:`top-1/2 `} ${leftPosition && leftPosition} ${width?width:' w-fit'}  rounded-lg pointer-events-auto `}>
        <form onSubmit={submit} className={`bg-gray-50 pb-5 rounded-lg border border-black ${classNameForm}`} encType='multipart/form-data'>
          {elementoName === 'Partido' ? (
            <div className='w-full flex rounded-t-lg bg-orange-500 justify-center items-center py-5 text-3xl font-bold text-white'>
                Cargar resultado
            </div>
          ):(
            elementoName === 'Fechas' ? (
                <div className='w-full flex bg-orange-500 justify-center items-center py-5 text-3xl font-bold text-white rounded-t-lg'>
                    Asignar arbitros
                </div>
            ) : (elementoName === 'Campeon' ? (
                <div className='w-full flex bg-orange-500 justify-center items-center py-5 text-3xl font-bold text-white rounded-t-lg'>
                    Finalizar liga
                </div>
            ):(elementoName === 'Voto' ? (
                <div className='w-full flex bg-orange-500 justify-center items-center py-5 text-3xl font-bold text-white rounded-t-lg'>
                    {`Jugador mas valioso`}
                </div>
            ) :
            ('')))
          )}
            <div className='px-20'>
                <div className='w-full flex justify-center items-center mt-1'>
                    <div className='w-48 h-48 rounded-full bg-white flex justify-center items-center'>
                    <img src={`/images/${liga.logo}?${new Date().getTime()}`} alt={`logo liga: ${liga.nombre}`} className='h-auto w-44 rounded-full' />
                    </div>
                </div>

                <FormsCrearEditar
                    elementoName={elementoName}
                    onCancel={onCancel}
                    data={data}
                    equipos={equipos}
                    dataObj={formData}
                    setDataObj={setDataObj}
                    errors={errors}
                    accion={accion}
                    setData={setData}
                    eliminar={eliminar}
                    equiposFiltrados={equiposFiltrados}
                    selectsEquipo1Seleccionado={selectsEquipo1Seleccionado}
                    selectsEquipo2Seleccionado={selectsEquipo2Seleccionado}
                    jugadores={jugadores}
                    jugadoresEquipo1={jugadoresEquipo1}
                    jugadoresEquipo2={jugadoresEquipo2}
                    handleSelectChange={handleSelectChange}
                    handleSelect2Change={handleSelect2Change}
                    users={users}
                    arbitros={arbitros}
                    liga={liga}
                    rol={rol}
                    arbitrosSelecto1={arbitrosSelecto1}
                    arbitrosSelecto2={arbitrosSelecto2}
                    setArbitrosSelecto1={setArbitrosSelecto1}
                    setArbitrosSelecto2={setArbitrosSelecto2}
                    />
            </div>
        </form>
      </div>
      {isModalConfirmarPartidoOpen&&(
        <ModalInformarErrores
            titulo={'Confirmar datos de partido'}
            cuerpo={'Una vez cargado el resultado no podra editar ni eliminar, revise bien antes de agregar.'}
            accion={'confirmar'}
            closeModal={() => {setModalConfirmarPartidoOpen(false);}}
            confirmar={() => {setConfirmado(true);setModalConfirmarPartidoOpen(false);}}
            />
      )}
    </>
  );
};

export default ModalCrearElemento;
