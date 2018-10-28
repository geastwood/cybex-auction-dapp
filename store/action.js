export const AUCTION_RECEIVE = 'AUCTION_REREIVE'
export const AUCTION_UPDATE = 'AUCTION_UPDATE'
export const BID_RECEIVE = 'BID_RECEIVE'
export const USER_RECEIVE = 'USER_RECEIVE'

export const auctionReceive = auctions => ({
    type: AUCTION_RECEIVE,
    payload: auctions,
})

export const auctionUpdate = auction => ({
    type: AUCTION_UPDATE,
    payload: auction,
})

export const bidReceive = bids => ({
    type: BID_RECEIVE,
    payload: bids,
})

export const userReceive = payload => ({
    type: USER_RECEIVE,
    payload,
})
