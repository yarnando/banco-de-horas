import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'

import global from './global'
import todos from './todos'

export default combineReducers({
    global,
    todos,
    router: connectRouter(history)
})