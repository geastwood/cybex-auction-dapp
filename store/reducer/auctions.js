import * as storeAction from '../action'

export const defaultState = []

export default (state = defaultState, action) => {
    switch (action.type) {
        case storeAction.AUCTION_RECEIVE:
            return [...state, ...action.payload]
        default:
            return state
    }
}
