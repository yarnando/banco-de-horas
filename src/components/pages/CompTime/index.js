import React, { Component } from "react";

import HoursOfDayForm from "./components/HoursOfDayForm";
import Menu from './components/Menu'
import Result from './components/Result/Result'
import List from "./components/List";

class CompTime extends Component {

  render() {
    return (
      <section className="container">
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


export default CompTime
