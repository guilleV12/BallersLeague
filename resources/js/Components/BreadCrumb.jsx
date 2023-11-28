import React, { useEffect, useState } from 'react';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

export const BreadCrumb = () => {
  const breadcrumbs = useReactRouterBreadcrumbs();
  const [breadcrumbsMostrados, setBreadcrumbsMostrados] = useState([]);

  useEffect(() => {
    breadcrumbs.map(({ breadcrumb }) => {
      const nombreBreadcrumb = breadcrumb.props.children;

      // Agregar el nombre del breadcrumb al conjunto de breadcrumbs mostrados
      if (!breadcrumbsMostrados.includes(nombreBreadcrumb)){
  
      setBreadcrumbsMostrados([...breadcrumbsMostrados, nombreBreadcrumb]);
      }
    
  })}, [breadcrumbs]);
  const breadcrumbsInvertidos = breadcrumbsMostrados.slice().reverse();
    
  return (
    <div className='breadcrumbs whitespace-nowrap font-semibold ml-2 hidden md:block'>
    {
      breadcrumbsInvertidos.map((breadcrumb, index) => 
        index === breadcrumbsMostrados.length-1 ? (
          <span className='text-orange-500 text-base' key={index}>{
              breadcrumbsInvertidos.includes('Jugadores') ? (
                'Lista de jugadores'
              ):(
                (breadcrumbsInvertidos.includes('Ligas') && breadcrumbsInvertidos.length>2) ? (
                  breadcrumb === 'Create' ? (
                    'Crear una liga'
                  ):('Ver una liga')
                ):(breadcrumb)
              )
            }</span>
        ):(
          breadcrumb + ' / '
        )
        
      )
    }
  </div>
    

  )}
      

export default BreadCrumb;
