import React, { Component } from 'react';

import { connect } from 'react-redux';

class components extends Component {
  render() {
    return         <div className="row">
    <div className="grid-item-6 space-around">
        <div>
            Banco de horas total: {this.props.hoursBank.hours || '00'}:{this.props.hoursBank.minutes || '00'}
        </div>
    </div>
</div>
  }
}

const mapStateToProps = state => ({
    hoursBank: state.comptime.hoursBank,
  });

export default connect(
  mapStateToProps,
)(components);
