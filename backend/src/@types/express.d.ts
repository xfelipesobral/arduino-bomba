import { Server } from 'socket.io'

declare module 'Express' {
    export interface Request {
        socketIo: Server
    }
}