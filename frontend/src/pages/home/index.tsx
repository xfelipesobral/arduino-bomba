import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { io } from 'socket.io-client'

import config from '../../json/config.json'

import Conectando from './etapas/conectando'
import Conectado from './etapas/conectado'
import Video from './etapas/video'

import './home.css'

function Home() {
	const [etapa, setEtapa] = useState('carregando')
	const [ciclo, setCiclo] = useState('1')
	const [situacao, setSituacao] = useState('1')
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

		if (mensagem.match('ciclo')) {
			const [_, ciclo] = mensagem.split('=')
			setCiclo(ciclo)
			return
		}

		if (mensagem.match('situacao')) {
			const [_, situacao] = mensagem.split('=')
			setSituacao(situacao)
			setEtapa('video')
			return
		}
	}

	const inicializaSocket = (id: string) => {
		const socket = io(config.socket)

		socket.on(id, (mensagem) => {
			trataMensagem(mensagem.replace(/(\r\n|\n|\r|b'|')/g, '').replace(/(?:\\[rn])+/g, ''))
		})
	}

	return (
		<div className='Home'>
			<div className='conteudo'>
				{
					{
						'conectando': <Conectando id={id} />,
						'conectado': <Conectado ciclo={ciclo} />,
						'video': <Video url={situacao === '1' ? 'bomba' : 'fogos'} />
					}[etapa]
				}
			</div>
			<footer>
				<p>UFPR Palotina - Licenciatura em Computação - <a href='https://github.com/xfelipesobral/arduino-bomba' target='_BLANK'>Github</a></p>
			</footer>
		</div>
	)
}

export default Home;
