import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router' 
import history from './history'

import MainPage from '../components/pages/MainPage'
import SecondaryPage from '../components/pages/SecondaryPage'

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Route path="/secondary" component={SecondaryPage}></Route>
        </Switch>
    </ConnectedRouter>
)

export default Routes