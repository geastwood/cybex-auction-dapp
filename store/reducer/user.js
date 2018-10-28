import * as storeActions from '../action'
const defaultState = null

export default (state = defaultState, action) => {
    if (action.type === storeActions.USER_RECEIVE) {
        return action.payload
    }
    return state
}
