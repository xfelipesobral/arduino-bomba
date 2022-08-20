import React from 'react'
import Lottie from 'react-lottie'

import animacaoBuscar from '../../../assets/animacoes/18809-radar-animation-for-maps.json'

interface iConectando {
    id: string
}

function Conectando({ id }: iConectando) {

    return (
        <div>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: animacaoBuscar
                }}
                height={200}
                width={200}
            />
            <h1>Procurando Dispositivo</h1>
            <p>{id}</p>
        </div>
    )
}

export default Conectando