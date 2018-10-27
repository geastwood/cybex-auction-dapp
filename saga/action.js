export const AUCTION_START = 'AUCTION_START'
export const EMIT = 'EMIT'

export const startAuction = () => ({
    type: AUCTION_START,
})

export const emitToSocket = payload => ({
    type: EMIT,
    payload,
})
