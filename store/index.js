import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'

const persistConfig = {
    key: 'primary',
    storage,
    blacklist: [],
    debug: __DEV__,
}
const reducer = persistReducer(persistConfig, reducers)

export default (middleware, onComplete) => {
    let localCompose = compose
    if (__DEV__) {
        localCompose = composeWithDevTools({ maxAge: 100 })
    }

    // $FlowFixMe
    const store = createStore(reducer, localCompose(applyMiddleware(...middleware)))
    const persistor = persistStore(store, null, onComplete)
    persistor.purge()

    return { store, persistor }
}
