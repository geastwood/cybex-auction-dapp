import { combineReducers } from 'redux'
import auctions from './auctions'
import bids from './bids'
import user from './user'

export default combineReducers({
    auctions,
    bids,
    user,
})
