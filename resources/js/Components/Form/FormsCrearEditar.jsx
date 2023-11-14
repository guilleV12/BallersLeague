import React, { useState, useEffect } from 'react';
import FormArbitro from './FormArbitro';
import FormEquipo from './FormEquipo';
import FormPartido from './FormPartido';
import { BotonCancelar, BotonContenido } from '../BotonesAcciones';
import FormFixture from './FormFixture';
import FormJugador from './FormJugador';
import FormFecha from './FormFecha';
import FormArbitrosFechas from './FormArbitrosFechas';
import FormNotificaciones from './FormNotificaciones';
import FormPlayoffs from './FormPlayoffs';
import FormFinalizarLiga from './FormFinalizarLiga';
import FormPatrocinador from './FormPatrocinador';

const FormsCrearEditar = ({
  elementoName,
  onCancel,
  data,
  dataObj,
  errors,
  setData,
  setDataObj,
  accion,
  eliminar,
  equipos,
  equiposFiltrados,
  selectsEquipo1Seleccionado,
  selectsEquipo2Seleccionado,
  jugadores,
  jugadoresEquipo1,
  jugadoresEquipo2,
  handleSelectChange,
  handleSelect2Change,
  arbitros,
  users,
  rol,
  arbitrosSelecto1,
  arbitrosSelecto2,
  setArbitrosSelecto1,
  setArbitrosSelecto2
}) => {

    return (
    <>
    {elementoName === 'Arbitro' ? (
        <>
          <FormArbitro
            elementoName={elementoName}
            onCancel={onCancel}
            data={data}
            errors={errors}
            setData={setData}
            />
        </>
    ):(
        elementoName === 'Equipo' ? (
            <>
              <FormEquipo
                elementoName={elementoName}
                onCancel={onCancel}
                data={data}
                errors={errors}
                setData={setData}
                accion={accion}
                />
            </>
        ):(
            elementoName === 'Fixture' ? (
                <FormFixture
                    elementoName={elementoName}
                    onCancel={onCancel}
                    data={data}
                    errors={errors}
                    setData={setData}
                    accion={accion}
                    />
            ): (
                elementoName === 'Partido' ? (
                    <FormPartido
                        elementoName={elementoName}
                        onCancel={onCancel}
                        data={data}
                        errors={errors}
                        setData={setData}
                        equiposFiltrados={equiposFiltrados}
                        selectsEquipo1Seleccionado={selectsEquipo1Seleccionado}
                        selectsEquipo2Seleccionado={selectsEquipo2Seleccionado}
                        jugadores={jugadores}
                        jugadoresEquipo1={jugadoresEquipo1}
                        jugadoresEquipo2={jugadoresEquipo2}
                        handleSelectChange={handleSelectChange}
                        handleSelect2Change={handleSelect2Change}
                        />
                ):(
                    elementoName === 'Jugador' ? (
                        <FormJugador
                            elementoName={elementoName}
                            onCancel={onCancel}
                            data={data}
                            errors={errors}
                            setData={setData}
                            accion={accion}
                            />
                    ):(
                        elementoName === 'Fecha' ? (
                            <FormFecha
                                elementoName={elementoName}
                                onCancel={onCancel}
                                data={dataObj}
                                errors={errors}
                                setData={setDataObj}
                                rol={rol}
                                arbitros={arbitros}
                                users={users}
                                arbitrosSelecto1={arbitrosSelecto1}
                                arbitrosSelecto2={arbitrosSelecto2}
                                setArbitrosSelecto1={setArbitrosSelecto1}
                                setArbitrosSelecto2={setArbitrosSelecto2}
                                />
                        ):(
                            elementoName === 'Fechas' ? (
                                <FormArbitrosFechas
                                    />
                            ):(
                                elementoName === 'Notificaciones' ? (
                                    <FormNotificaciones
                                        data={data}
                                        setData={setData}
                                        accion={accion}
                                        errors={errors}
                                        elementoName={elementoName}
                                        onCancel={onCancel}
                                        />
                                ):(
                                    elementoName === 'Playoffs' ? (
                                        <FormPlayoffs
                                            elementoName={elementoName}
                                            onCancel={onCancel}
                                            data={data}
                                            errors={errors}
                                            setData={setData}
                                            equipos={equipos}
                                            accion={accion}
                                            />
                                    ):(
                                        elementoName === 'Liga' ? (
                                            <FormFinalizarLiga
                                                data={data}
                                                />
                                        ):(
                                            elementoName === 'Patrocinador' ? (
                                                <FormPatrocinador
                                                    elementoName={elementoName}
                                                    onCancel={onCancel}
                                                    data={data}
                                                    errors={errors}
                                                    setData={setData}
                                                    accion={accion}
                                                    />
                                            ):('')
                                        )
                                    )
                                )
                            )
                        )
                        
                    )
                )
            )
        )
    )}

    <div className="flex items-center justify-center mt-4">
        {   
                eliminar === true ? (
                    <>
                    <BotonEliminar
                        className={' ml-2'}
                        />
                    <BotonCancelar
                        className={' ml-2'}
                        onClick={onCancel}
                        nombre={'Cancelar'}
                        />
                    </>
                ) : (
                    <>
                    <BotonContenido
                        nombre={accion === 'agregar' ? (
                            'Agregar'
                        ) : (
                            'Editar'
                        )}
                        className={' ml-2'}
                        />
                    <BotonCancelar
                        onClick={onCancel}
                        className={' ml-2'}
                        nombre={'Cancelar'}
                        />
                    </>
                )
            
        }
    </div>
    </>
  );
};

export default FormsCrearEditar;
