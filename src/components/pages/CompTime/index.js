import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from '../../../store/ducks/comptime'

import Card from '../../shared/card'

import Form from './components/Form'

class CompTime extends Component {

    state = {
        showingForm: false,
    }

    changeYear = (e) => {
        this.props.setMonthSelected("")
        this.props.setYearSelected(e.target.value)     
    }

    changeMonth = (e) => {
        let month = `${e.target.value<10?'0':''}${e.target.value}`
        this.props.setMonthSelected(month)
        if(!!month == false) return 
        this.props.getComptimeList('idficticio', this.props.yearSelected, month);
    }

    showForm = (comptime) => {
        this.setState({ showingForm: true })
        this.props.setComptime(comptime)
    }

    render() {
      return <section className="container">
            <Form showingForm={this.state.showingForm} editingDay={this.state.editingDay} onClose={() => this.setState({ showingForm: false })}/>
            <form noValidate>
                <div className="row">
                    <div className="grid-item-3">
                        <div className="input-box">
                            <label>Ano</label> 
                            <select value={this.props.yearSelected}
                                    onChange={(e) => this.changeYear(e)}>
                                <option value="">Selecione uma opção</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>                             
                    </div>
                </div>
                <div className="row">
                    <div className="grid-item-3">
                        <div className="input-box">
                            <label>Mês</label> 
                            <select value={this.props.monthSelected}
                            disabled={!!this.props.yearSelected == false}
                                    onChange={(e) => this.changeMonth(e)}>
                                <option value="">Selecione uma opção</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                            </select>
                        </div>                       
                    </div>                    
                </div>
                <div className="row">
                {!!this.props.comptimeList.length && this.props.comptimeList.map( (comptime, index) => (
                        <div onClick={() => this.showForm(comptime)} className="grid-item-2" key={index}>
                            <Card withHeader={
                                <div className="row align-center">
                                    <div className="grid-item-6 content-center">
                                        <span>{comptime.day}</span>
                                    </div>
                                </div>
                            }>
                                <div className="flex">
                                    <div className="text-right flex-1">Chegada:</div>
                                    <div className="pl-4 text-left flex-1">{comptime.startingTime}</div>                                   
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Entrada do almoço</div>
                                    <div className="pl-4 text-left flex-1">{comptime.lunchStart}</div>                                      
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Saída do almoço</div>
                                    <div className="pl-4 text-left flex-1">{comptime.lunchEnd}</div>     
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Saída</div>
                                    <div className="pl-4 text-left flex-1">{comptime.stoppingTime}</div>   
                                </div>
                           
                            </Card>
                        </div>           
                ))}
                 </div>  
                <div className="row">{this.props.yearSelected}  </div>
                <div className="row">{this.props.monthSelected}    </div>
            </form>            
      

      </section>;
    }
  }

const mapStateToProps = state => ({
    yearSelected: state.comptime.yearSelected,
    monthSelected: state.comptime.monthSelected,
    comptimeList: state.comptime.comptimeList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comptimeCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompTime);

