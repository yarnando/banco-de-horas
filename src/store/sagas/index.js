import { all } from 'redux-saga/effects';
import todosSaga from './todos'

export default function* rootSagas() {
    yield all([
        ...todosSaga
    ])
}