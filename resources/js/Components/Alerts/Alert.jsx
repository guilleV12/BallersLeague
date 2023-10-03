import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Alert({ titulo, texto, tiempo, icono, showAlert, closeAlert }) {
  useEffect(() => {
    if (showAlert) {
      MySwal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        timer: tiempo,
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
            setTimeout(() => {
                closeAlert();
              }, tiempo);
        },
      })
    }
  }, [showAlert, titulo, texto, tiempo, icono]);

}

export default Alert;
