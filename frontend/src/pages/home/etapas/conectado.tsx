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

            <div className='lista'>
                <ol>
                    <li>10/2</li>
                    <li>943.283,48 * 0</li>
                    <li>#VemParaUFPR</li>
                    <li>Olhe ao seu redor...</li>
                </ol>
            </div>
        </div>
    )
}

export default Conectado