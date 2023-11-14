import React from 'react'
import CardPatrocinador from './CardPatrocinador'

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
            patrocinadores.map((patrocinador)=>
                <div key={patrocinador.id}>
                    <CardPatrocinador
                        patrocinador={patrocinador}
                        userAdmin={userAdmin}
                        user={user}
                        setShowAlert={setShowAlert}
                        setTituloAlert={setTituloAlert}
                        liga={liga}
                        />
                </div>
            )
        }
       
    </div>
  )
}

export default TabPatrocinadores