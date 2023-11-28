import React from 'react'
import TablaPaginadaPatrocinadores from './TablaPaginadaPatrocinadores'

const TabPatrocinadores = ({
    patrocinadores,
    user,
    userAdmin,
    setShowAlert,
    setTituloAlert,
    liga
}) => {
  return (
    <div>
        {
            <TablaPaginadaPatrocinadores
                data={patrocinadores}
                user={user}
                userAdmin={userAdmin}
                liga={liga}
                setShowAlert={setShowAlert}
                setTituloAlert={setTituloAlert}

            />
        }
       
    </div>
  )
}

export default TabPatrocinadores