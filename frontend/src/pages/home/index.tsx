import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { io } from 'socket.io-client'

import config from '../../json/config.json'

import Conectando from './etapas/conectando'
import Conectado from './etapas/conectado'

import './home.css'

function Home() {
	const [etapa, setEtapa] = useState('carregando')
	const [ciclo, setCiclo] = useState('1')
	const [id, setId] = useState('')

	useEffect(() => {
		let id = localStorage.getItem('arduinoBombaID')

		if (!id) {
			id = uuid()
			localStorage.setItem('arduinoBombaID', id)
		}

		setId(id)
		inicializaSocket(id)

		setEtapa('conectando')
	}, [])

	const trataMensagem = (mensagem: string) => {
		if (mensagem === 'conectado') {
			setEtapa('conectado')
			setCiclo('1')
			return
		}
	}

	const inicializaSocket = (id: string) => {
        const socket = io(config.socket)

        socket.on(id, (mensagem) => {
            trataMensagem(mensagem)
        })
    }

	return (
		<div className='Home'>
			{
				{
					'conectando': <Conectando id={id} />,
					'conectado': <Conectado ciclo={ciclo} />
				}[etapa]
			}
		</div>
	);
}

export default Home;
