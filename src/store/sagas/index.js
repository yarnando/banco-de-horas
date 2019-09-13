import { all } from 'redux-saga/effects'
import auth from './auth'
import comptime from './comptime'

export default function* rootSagas() {
    yield all([
        ...auth,
        ...comptime,
    ])
}