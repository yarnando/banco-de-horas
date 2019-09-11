import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../history'

import global from './_global'
import auth from './auth'
import comptime from './comptime'

export default combineReducers({
    global,
    auth,
    comptime,
    router: connectRouter(history)
})