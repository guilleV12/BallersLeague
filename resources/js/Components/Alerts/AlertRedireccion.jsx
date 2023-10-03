import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function AlertRedireccion({ titulo, texto, tiempo, icono, redirectUrl }) {
  useEffect(() => {
      MySwal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        timer: tiempo,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        // Después de que la alerta se cierre automáticamente (timer), redirecciona
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      });
  }, [titulo, texto, tiempo, icono, redirectUrl]);

  return null; // El componente no renderiza nada en la interfaz
}

export default AlertRedireccion;