import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { creators as comptimeCreators } from "../../../../store/ducks/comptime";

import Card from "../../../shared/card";
import Loading from "../../../shared/loading";

class components extends Component {
  showForm = comptime => {
    this.props.setShowingForm(true);
    this.props.setComptime(comptime);
  };

  render() {
    return (
      <div className="row">
        { (this.props.loading && !!this.props.comptimeList.length == false) && (
          <div className="grid-item-6 content-center">
            <Loading loading={this.props.loading} size={22} />
          </div>
        )}
        {!!this.props.comptimeList.length &&
          this.props.comptimeList.map((comptime, index) => (
            <div
              onClick={() => this.showForm(comptime)}
              className="grid-item-2"
              key={index}
            >
              <Card
                withHeader={
                  <div className="row align-center">
                    <div className="grid-item-6 content-center">
                      <span>{comptime.day}</span>
                    </div>
                  </div>
                }
                withFooter={
                  <div className="align-center">
                    <div className="grid-item-6 content-center">
                      <h3>Saldo do dia: {comptime.difference.hours}h e { comptime.difference.hours >= 0 ? comptime.difference.minutes : Math.abs(comptime.difference.minutes) }min</h3>
                    </div>
                  </div>
                }                
              >
                <div className="flex">
                  <div className="text-right flex-1">Chegada:</div>
                  <div className="pl-4 text-left flex-1">
                    {comptime.startingTime}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-right flex-1">Entrada do almoço</div>
                  <div className="pl-4 text-left flex-1">
                    {comptime.lunchStart}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-right flex-1">Saída do almoço</div>
                  <div className="pl-4 text-left flex-1">
                    {comptime.lunchEnd}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-right flex-1">Saída</div>
                  <div className="pl-4 text-left flex-1">
                    {comptime.stoppingTime}
                  </div>
                </div>
              </Card>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comptimeList: state.comptime.comptimeList,
  showingForm: state.comptime.showingForm,
  loading: state.global.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comptimeCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(components);
