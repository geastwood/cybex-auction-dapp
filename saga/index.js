import createSagaMiddleware from 'redux-saga'
import { call } from 'redux-saga/effects'
import ui from './root'

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
    while (true) {
        try {
            yield call(ui)
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.error('saga-crash', ex)
        }
    }
}
