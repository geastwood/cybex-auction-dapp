import * as storeAction from '../action'

const testData = [
    {
        id: 1,
        auctionId: 1,
        name: 'bid1',
    },
    {
        id: 2,
        auctionId: 1,
        name: 'bid1',
    },
    {
        id: 2,
        auctionId: 1,
        name: 'bid1',
    },
]

export const defaultState = [...testData]

export default (state = defaultState, action) => {
    switch (action.type) {
        case storeAction.BID_RECEIVE:
            return [...state, action.payload]
        default:
            return state
    }
}
