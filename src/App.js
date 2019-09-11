import React from 'react';

import { Provider } from 'react-redux'
import store from './store'

import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import Routes from "./routes";

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>  
        </ConnectedRouter>        
    </Provider>
)

export default App;
