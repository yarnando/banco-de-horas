import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from "../../../../store/ducks/comptime";

class components extends Component {

    changeYear = e => {
        this.props.setMonthSelected("");
        this.props.setYearSelected(e.target.value);
    };

    changeMonth = e => {
        let month = `${e.target.value < 10 ? "0" : ""}${e.target.value}`;
        this.props.setMonthSelected(month);
        if (!!month == false) return;
        this.props.getComptimeList("idficticio", this.props.yearSelected, month);
    };

    render() {
        return (
            <form noValidate>
                <div className="row">
                    <div className="grid-item-3">
                        <div className="input-box">
                            <label>Ano</label>
                            <select
                                value={this.props.yearSelected}
                                onChange={e => this.changeYear(e)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid-item-3">
                        <div className="input-box">
                            <label>Mês</label>
                            <select
                                value={this.props.monthSelected}
                                disabled={!!this.props.yearSelected == false}
                                onChange={e => this.changeMonth(e)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    yearSelected: state.comptime.yearSelected,
    monthSelected: state.comptime.monthSelected,    
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(comptimeCreators, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(components);
