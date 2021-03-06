import React, { Component } from "react";

import { connect } from "react-redux";
import "./styles.css";

class components extends Component {
  render() {
    return (
      <div className="row content-end">
        <div className="grid-item-6 content-center">
          <div className="hoursBankContainer">
            <h4 className="hoursBankTitle">Saldo Atual</h4>
            <h5>
              {`${this.props.hoursBank.hours || "00"}h ${this.props.hoursBank.minutes || "00"}m`}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hoursBank: state.comptime.hoursBank
});

export default connect(mapStateToProps)(components);
