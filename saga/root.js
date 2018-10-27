import { fork, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { watchSocketData, watchAuctionStart } from './watcher'
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
        socket.on('message', handler)
        return () => {
            socket.off('data', handler)
        } // unsubscribe
    })

export default function* root() {
    const socketCh = yield call(createEventChannel, 'http://localhost:8080')
    yield call(watchSocketData, socketCh)
    yield call(watchAuctionStart)
}
