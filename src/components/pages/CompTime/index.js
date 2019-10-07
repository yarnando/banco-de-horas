import React, { Component } from "react";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { creators as authActions } from '../../../store/ducks/auth'

import HoursOfDayForm from "./components/HoursOfDayForm";
import Menu from './components/Menu'
import Result from './components/Result/Result'
import List from "./components/List";
import Loading from '../../shared/loading'

class CompTime extends Component {

  render() {
    return (
      <section className="container">
          {this.props.auth.user.email && 
            <div className="row">
                <div className="grid-item-6 align-center content-center">
                    Logado como: {this.props.auth.user.email} {this.props.loading ? <Loading loading={this.props.loading} size={22}/> : <button onClick={() => this.props.logOut()}>Sair</button>}
                </div>
            </div>        
          }
        <HoursOfDayForm />
        <div className="row align-center space-between">
            <div className="grid-item-4 block">
                <Menu/>
            </div>
            <div className="grid-item-2">
                <Result/>
            </div>
        </div>
        <List/>
      </section>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.global.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompTime)
