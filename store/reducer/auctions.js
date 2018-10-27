import * as storeAction from '../action'

export const defaultState = []

export default (state = defaultState, action) => {
    switch (action.type) {
        case storeAction.AUCTION_RECEIVE:
            return [...state, ...action.payload]
        case storeAction.AUCTION_UPDATE:
            return [...state.filter(({ id }) => id !== action.payload.id), action.payload]
        default:
            return state
    }
}
