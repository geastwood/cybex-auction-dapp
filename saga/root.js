import { fork, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { watchSocketSendData, watchSocketData } from './watcher'
import io from 'socket.io-client'

const createEventChannel = url =>
    eventChannel(emitter => {
        const socket = io(url)
        console.log('starting socket @', url) // eslint-disable-line
        socket.on('connect', function() {
            emitter({ type: 'SOCKET_STATUS', payload: 'connected' })
        })
        socket.on('disconnect', function() {
            emitter({ type: 'SOCKET_STATUS', payload: 'disconnected' })
        })
        const handler = data => {
            emitter({ type: 'DATA', payload: data })
        }
        socket.on('data', handler)
        return () => {
            socket.off('data', handler)
        } // unsubscribe
    })

export default function* root() {
    const wsUrl = 'http://localhost:8080'
    const socketCh = yield call(createEventChannel, wsUrl)
    yield fork(watchSocketSendData, wsUrl)
    yield fork(watchSocketData, socketCh)
}
