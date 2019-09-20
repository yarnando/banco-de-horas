import React, { Component } from "react";

import HoursOfDayForm from "./components/HoursOfDayForm";
import Menu from './components/Menu'
import Result from './components/Result'
import List from "./components/List";

class CompTime extends Component {

  render() {
    return (
      <section className="container">
        <HoursOfDayForm />
        <Menu/>
        <Result/>
        <List/>
      </section>
    );
  }
}


export default CompTime
