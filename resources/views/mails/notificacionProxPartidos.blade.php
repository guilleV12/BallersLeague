<!DOCTYPE html>
<html>
<head>
    <title>Notificación de Partidos</title>
</head>
<body>
    <h1>Notificación de Partidos</h1>
    <p>Hola, {{ $usuario->nombre }} {{$usuario->apellido}}</p>
    <p>Aquí tienes la información de los proximos partidos programados de la liga "{{ $liga->nombre }}":</p>

    @if (count($fechaPartidos)>0)
        <ul>
        @foreach ($fechaPartidos as $fecha)
            <li> {{$fecha->fecha}} {{$fecha->horario}} | 
                @foreach ($equipos as $equipo) 
                    @if ($equipo->id == $fecha->equipo_1)
                        {{$equipo->nombre}} 
                    @endif
                @endforeach
                 vs 
                @foreach ($equipos as $equipo) 
                    @if ($equipo->id == $fecha->equipo_2)
                        {{$equipo->nombre}} 
                    @endif
                @endforeach.
            </li>
        @endforeach
        </ul>
    @else
        <p>No hay partidos programados proximamente en esta liga.</p>
    @endif

    <p>Gracias por usar nuestro servicio.</p>
</body>
</html>
