import * as storeActions from '../store/action'
import * as sagaActions from '../saga/action'
import { take, put, fork } from 'redux-saga/effects'
import io from 'socket.io-client'

function* handleAuctionUpdate(res) {
    const { auction } = res
    yield put(storeActions.auctionUpdate(auction))
}

export function* watchSocketData(chan) {
    while (true) {
        const { payload } = yield take(chan)
        if (payload.type === 'auction.update') {
            yield fork(handleAuctionUpdate, payload.payload)
        }
        // console.log('socketData: ', socketData)
    }
}

export function* watchSocketSendData(url) {
    const socket = io(url)

    while (true) {
        const { payload } = yield take(sagaActions.EMIT)
        socket.emit('message', payload)
    }
}
