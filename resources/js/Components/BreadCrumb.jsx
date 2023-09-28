import React from 'react'

export const BreadCrumb = () => {
  return (
    <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                Application Layout
                <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" 
                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                </li>
                <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                Dashboard
                </li>
    </ol>
  )
}

export default BreadCrumb;