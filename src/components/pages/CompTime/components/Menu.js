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

    pastYears = () => {
        let years = []
        let currentYear = new Date().getFullYear()
        let startYear = 2019
        while ( startYear <= currentYear ) {
            years.push(startYear++);
        }  
        return years         
    }

    pastMonths = () => {
        let currentDate = new Date()
        let currentMonth = this.props.yearSelected == currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12
        let months = []
        let monthsRaw = [
            {key: "1", label: "Janeiro"},
            {key: "2", label: "Fevereiro"},
            {key: "3", label: "Março"},
            {key: "4", label: "Abril"},
            {key: "5", label: "Maio"},
            {key: "6", label: "Junho"},
            {key: "7", label: "Julho"},
            {key: "8", label: "Agosto"},
            {key: "9", label: "Setembro"},
            {key: "10", label: "Outubro"},
            {key: "11", label: "Novembro"},
            {key: "12", label: "Dezembro"}
        ]
        for (let index = 1; index <= currentMonth; index++) {
            months.push(monthsRaw[index-1])
        }
        return months
    }

    render() {
        return (
            <form noValidate className="row block">
                    <div className="grid-item-6 pt-4">
                        <div className="input-box">
                            <label>Ano</label>
                            <select
                                value={this.props.yearSelected}
                                onChange={e => this.changeYear(e)}
                            >
                                <option value="">Selecione uma opção</option>
                                {
                                    this.pastYears().map( (year, index) => <option key={index} value={year}>{year}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="grid-item-6 pt-4">
                        <div className="input-box">
                            <label>Mês</label>
                            <select
                                value={this.props.monthSelected}
                                disabled={!!this.props.yearSelected == false}
                                onChange={e => this.changeMonth(e)}
                            >
                                <option value="">Selecione uma opção</option>
                                {
                                    this.pastMonths().map( (month, index) => <option key={index} value={month.key}>{month.label}</option>)
                                }
                            </select>
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
