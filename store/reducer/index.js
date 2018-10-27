import { combineReducers } from 'redux'
import auctions from './auctions'
import bids from './bids'

export default combineReducers({
    auctions,
    bids,
})
