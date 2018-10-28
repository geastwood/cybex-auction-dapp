import * as storeAction from '../action'

const testData = [
    {
        id: 1,
        auctionId: 1,
        user: 'user1',
        price: 10,
        timestamp: 1540675025582,
    },
    {
        id: 2,
        auctionId: 1,
        user: 'user2',
        price: 11,
        timestamp: 1540675023582,
    },
    {
        id: 3,
        auctionId: 1,
        user: 'user3',
        price: 12,
        timestamp: 1540675083582,
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
