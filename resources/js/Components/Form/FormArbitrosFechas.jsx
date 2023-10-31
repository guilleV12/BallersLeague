import React, { useState, useEffect } from 'react';

const FormArbitrosFechas = ({
  elementoName,
  onCancel,
  data,
  errors,
  setData,
}) => {



  return (
    <>
    <div className="w-full bg-white">
        <p className="text-base leading-relaxed text-black dark:text-gray-400">
            Desea asignar arbitros a todos? Si alguna fecha tiene un arbitro no se modificara.
        </p>
    </div>
   
    </>
  );
};

export default FormArbitrosFechas;
