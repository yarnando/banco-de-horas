import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

//Auth
import Signin from '../components/pages/Auth/Signin'
import Signup from '../components/pages/Auth/Signup'

//CompTime
import CompTime from '../components/pages/CompTime'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        rest.userLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  ) 

const Routes = ({ userLogged }) => (
    <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <PrivateRoute path="/comptime" exact userLogged={userLogged} component={CompTime}/>
    </Switch>
)

const mapStateToProps = state => ({
    userLogged: state.auth.userLogged
});

export default connect(mapStateToProps)(Routes);