import { combineReducers } from 'redux'
import global from './global'
import todos from './todos'

export default combineReducers({
    global,
    todos
})