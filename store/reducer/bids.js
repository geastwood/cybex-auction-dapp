import * as storeAction from '../action'

const testData = []

export const defaultState = [...testData]

export default (state = defaultState, action) => {
    switch (action.type) {
        case storeAction.BID_RECEIVE:
            return [...state, action.payload]
        case storeAction.BID_REPLACE:
            return [action.payload]
        default:
            return state
    }
}
