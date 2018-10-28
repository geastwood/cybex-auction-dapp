import { isNumber } from 'lodash'
import * as storeActions from '../store/action'
import * as sagaActions from '../saga/action'
import { call, select, take, put, fork } from 'redux-saga/effects'
import io from 'socket.io-client'
import { url } from '../config'

function* handleAuctionUpdate(res) {
    const { auction } = res
    yield put(storeActions.auctionUpdate(auction))

    if (auction.state === 'closed') {
        const raw = yield call(fetch, `${url}/result/${auction.id}`)
        const result = yield call([raw, 'json'])
        const user = yield select(({ user }) => user)
        if (result.data.user === user) {
            alert('You won')
        } else {
            alert(`${user} has won`)
        }
    }
}

function* handleBidReceive(res) {
    const { bid } = res
    yield put(storeActions.bidReceive(bid))
}

export function* watchUpdateAuction() {
    while (true) {
        const { payload: { id, data } } = yield take(sagaActions.UPDATE_AUCTION)
        yield put(
            sagaActions.emitToSocket({
                type: 'auction.update',
                payload: { id, auction: { ...data, endTime: Date.now() } },
            }),
        )
    }
}

export function* watchSendBid() {
    while (true) {
        const { payload: { auctionId, bid } } = yield take(sagaActions.BID)
        const auction = yield select(({ auctions }) => auctions.find(a => a.id === auctionId))
        // validation

        if (!bid.user) {
            alert('Not a valid user.')
            continue
        }

        if (auction.state !== 'opened') {
            alert('Auction is not accepting bids now.')
            continue
        }

        if (Number.isNaN(Number(bid.price))) {
            alert(`Auction price :"${bid.price}" is not valid.`)
            continue
        }

        if (bid.price <= auction.minimiumBidPrice) {
            alert(`This auction requires a minimium bid of "${auction.minimiumBidPrice}"`)
            continue
        }

        yield put(
            sagaActions.emitToSocket({
                type: 'bid.send',
                payload: {
                    user: bid.user,
                    price: bid.price,
                    auctionId: auctionId,
                    timestamp: Date.now(),
                },
            }),
        )
    }
}

export function* watchSocketData(chan) {
    while (true) {
        const { payload } = yield take(chan)
        if (payload.type === 'auction.update') {
            yield fork(handleAuctionUpdate, payload.payload)
        }
        if (payload.type === 'bid.send') {
            yield fork(handleBidReceive, payload.payload)
        }
        // console.log('socketData: ', socketData)
    }
}

export function* watchSocketSendData(url) {
    const socket = io(url)

    while (true) {
        const { payload } = yield take(sagaActions.EMIT)
        console.log(payload)
        socket.emit('message', payload)
    }
}
