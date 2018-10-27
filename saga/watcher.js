import * as storeActions from '../store/action'
import { take, put } from 'redux-saga/effects'

// eslint-disable-next-line import/prefer-default-export
export function* watchAuctionStart() {
    yield take('AUCTION_START')

    yield put(storeActions.auctionReceive([{ name: 'from watch' }]))
    // eslint-disable-next-line
    console.log('ui watcher startAuction')
}

export function* watchSocketData(chan) {
    while (true) {
        const socketData = yield take(chan)
        console.log('socketData: ', socketData)
    }
}
