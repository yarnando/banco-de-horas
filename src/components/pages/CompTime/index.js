import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const getDays = (month, year) => new Date(year, month, 0).getDate();

class CompTime extends Component {

    state = {
        year: 1999,
        month: 1,
        numberOfDays: 0
    }

    getDays = (month, year) => {
        this.setState({
            numberOfDays: new Date(year, month, 0).getDate()
        })
    }

    render() {
      return <div>
          <input onChange={(e) => this.setState({ month: e.target.value })} type="text" placeholder="Month"/>
          <input onChange={(e) => this.setState({ year: e.target.value })} type="text" placeholder="Year"/>
          <button onClick={() => this.getDays(this.state.month, this.state.year)}> Submit</button>
          {this.state.numberOfDays}
      </div>;
    }
  }

const mapStateToProps = state => ({
    
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CompTime);

