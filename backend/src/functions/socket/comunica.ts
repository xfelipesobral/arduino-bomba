import { Request, Response } from 'express'

function socketComunica(request: Request, response: Response) {
    const { id, conteudo } = request.body

    if (!id || !conteudo) {
        return response.status(400).send({
            status: 'Falhou... Verifique os campos e envie novamente'
        })
    }

    request.socketIo.emit(id, conteudo)

    return response.status(200).send({
        status: 'Mensagem enviada...'
    })
}

export default socketComunica