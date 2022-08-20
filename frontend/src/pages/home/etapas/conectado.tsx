import React from 'react'
import Lottie from 'react-lottie'

interface iConectado {
    ciclo: String
}

function Conectado({ ciclo }: iConectado) {

    const meme = () => {
        const percentual = (Number(ciclo) / 60) * 100
        
        if (percentual > 80) return 3
        if (percentual > 40) return 2
        return 1
    }

    return (
        <div className='conectado'>
            <img src={`/assets/meme/${meme()}.png`} />
            <h1>{ciclo.padStart(2, '0')}</h1>
        </div>
    )
}

export default Conectado