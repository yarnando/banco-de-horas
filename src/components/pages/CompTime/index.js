import React, { Component } from "react";

import { connect } from "react-redux";

import Menu from './components/Menu'
import HoursOfDayForm from "./components/HoursOfDayForm";
import List from "./components/List";

class CompTime extends Component {

    state = {
        hoursBank: {
            hours: 0,
            minutes: 0
        }
    }

  render() {
    return (
      <section className="container">
        <HoursOfDayForm />

        <Menu/>
        <div className="row">
            <div className="grid-item-6 space-around">
                <div>
                    Banco de horas total: {this.props.hoursBank.hours || '00'}:{this.props.hoursBank.minutes || '00'}
                </div>
            </div>
        </div>
        <List/>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  hoursBank: state.comptime.hoursBank,
});


export default connect(
  mapStateToProps,
)(CompTime);
