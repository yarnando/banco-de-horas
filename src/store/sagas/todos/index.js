import { takeLatest, put, call } from 'redux-saga/effects'
import { Types as globalTypes } from '../../ducks/global'
import { Types as todosTypes } from '../../ducks/todos'
import api from '../../services/api'

function* getTodos() {

    try {

        yield put({ type: globalTypes.TOGGLE_LOADING })

        const response = yield call(api.get, 'todos')

        yield put({
            type: todosTypes.SET_TODOLIST,
            payload: {
                todoList: response.data
            }
        })

        yield put({ type: globalTypes.TOGGLE_LOADING })

    } catch (error) {
        console.log(error)       
    }

}

export default [
    takeLatest(todosTypes.GET_TODOLIST, getTodos)
]
        




