export const AUCTION_START = 'AUCTION_START'
export const EMIT = 'EMIT'
export const BID = 'BID'
export const UPDATE_AUCTION = 'UPDATE_AUCTION'

export const startAuction = () => ({
    type: AUCTION_START,
})

export const emitToSocket = payload => ({
    type: EMIT,
    payload,
})

export const bid = (auctionId, bid) => ({
    type: BID,
    payload: {
        auctionId,
        bid,
    },
})

export const updateAuction = (id, data) => ({
    type: UPDATE_AUCTION,
    payload: {
        id,
        data,
    },
})
