<!DOCTYPE html>
<html>
<head>
    <title>Resultados de Partidos</title>
</head>
<body>
    <h1>Notificación de resultados de los utlimos partidos disputados</h1>
    <p>Hola, {{ $usuario->nombre }} {{$usuario->apellido}}</p>
    <p>Aquí tienes la información de los ultimos partidos disputados de la liga "{{ $liga->nombre }}":</p>

    @if (count($fechasPartidoRegular)>0)
        @if (count($partidos)>0)
            <ul>
            @foreach ($fechasPartidoRegular as $fecha)
                <li> {{$fecha->fecha}} {{$fecha->horario}} | 
                    @foreach ($equipos as $equipo) 
                        @if ($equipo->id == $fecha->equipo_1)
                            {{$equipo->nombre}} 
                        @endif
                    @endforeach
                    @foreach ($partidos as $partido)
                        @if ($partido->fecha_partido_id == $fecha->id)
                            {{$partido->puntaje_equipo_1}}
                                vs 
                            {{$partido->puntaje_equipo_2}}
                        @endif
                    @endforeach
                    @foreach ($equipos as $equipo) 
                        @if ($equipo->id == $fecha->equipo_2)
                            {{$equipo->nombre}} 
                        @endif
                    @endforeach.
                </li>
            @endforeach
            </ul>
        @endif
    @endif
    @if (count($fechasPartidoPlayoffs)>0)
        @if (count($partidosPlayoffs)>0)
            <ul>
            @foreach ($fechasPartidoPlayoffs as $fecha)
                <li> {{$fecha->fecha}} {{$fecha->horario}} | 
                    @foreach ($equipos as $equipo) 
                        @if ($equipo->id == $fecha->equipo_1)
                            {{$equipo->nombre}} 
                        @endif
                    @endforeach
                    @foreach ($partidosPlayoffs as $partido)
                        @if ($partido->fecha_partido_playoffs_id == $fecha->id)
                            {{$partido->puntaje_equipo_1}}
                                vs 
                            {{$partido->puntaje_equipo_2}}
                        @endif
                    @endforeach
                    @foreach ($equipos as $equipo) 
                        @if ($equipo->id == $fecha->equipo_2)
                            {{$equipo->nombre}} 
                        @endif
                    @endforeach.
                </li>
            @endforeach
            </ul>
        @endif
    @endif

    @if (count($fechasPartidoRegular)<=0 && count($fechasPartidoPlayoffs)<=0)
        <p>No se jugaron partidos recientemente (ayer ni hoy) en esta liga.</p>
    @endif

    <p>Gracias por usar nuestro servicio.</p>
</body>
</html>
