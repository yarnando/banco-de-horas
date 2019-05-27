import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MainPage from './components/pages/MainPage'
import SecondaryPage from './components/pages/SecondaryPage'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Route path="/secondary" component={SecondaryPage}></Route>
        </Switch>
    </BrowserRouter>
)

export default Routes