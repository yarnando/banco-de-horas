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
                    Total de horas: {this.props.hoursBank.hours}
                </div>
                
                <div>
                    Total de minutos: {this.props.hoursBank.minutes}
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
