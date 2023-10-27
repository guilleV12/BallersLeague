import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

export const BreadCrumb = () => {
  const breadcrumbs = useReactRouterBreadcrumbs();
  const validBreadcrumbs = breadcrumbs.filter(({ breadcrumb }) => breadcrumb.key);

  return (
    <div className="breadcrumbs whitespace-nowrap font-semibold ml-2">
      {validBreadcrumbs.map(({ breadcrumb }, index) => (
        <React.Fragment key={index}>
          <span href={breadcrumb.key} className={`${index === validBreadcrumbs.length - 1?`text-orange-500`:``}`}>
            {breadcrumb}
          </span>
          {index < validBreadcrumbs.length - 1 && <span> / </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
