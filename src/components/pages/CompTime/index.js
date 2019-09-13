import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from '../../../store/ducks/comptime'

import Card from '../../shared/card'

class CompTime extends Component {

    state = {
        year: "",
        month: "",
    }

    changeYear = (e) => {
        this.setState({ month: "" })
        this.setState({ year: e.target.value })        
    }

    changeMonth = (e) => {
        let month = `${e.target.value<10?'0':''}${e.target.value}`
        this.setState({ month: month }) 
        if(!!month == false) return 
        this.props.getComptimeList('idficticio', this.state.year, month);
    }


    render() {
      return <section className="container">
            <form noValidate>
                <div className="row">
                    <div className="grid-item-3">
                        <div className="input-box">
                            <label>Ano</label> 
                            <select value={this.state.year}
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
                            <select value={this.state.month}
                            disabled={!!this.state.year == false}
                                    onChange={(e) => this.changeMonth(e)}>
                                <option value="">Selecione uma opção</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                            </select>
                        </div>                       
                    </div>                    
                </div>
                <div className="row">
                {!!this.props.comptimeList.length && this.props.comptimeList.map( (item, index) => (
                        <div className="grid-item-2" key={index}>
                            <Card withHeader={
                                <div className="row align-center">
                                    <div className="grid-item-6 content-center">
                                        <span>{item.day}</span>
                                    </div>
                                </div>
                            }>
                                <div className="flex">
                                    <div className="text-right flex-1">Chegada:</div>
                                    <div className="pl-4 text-left flex-1">{item.startingTime}</div>                                   
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Entrada do almoço</div>
                                    <div className="pl-4 text-left flex-1">{item.lunchStart}</div>                                      
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Saída do almoço</div>
                                    <div className="pl-4 text-left flex-1">{item.lunchEnd}</div>     
                                </div>
                                <div className="flex">
                                    <div className="text-right flex-1">Saída</div>
                                    <div className="pl-4 text-left flex-1">{item.stoppingTime}</div>   
                                </div>
                           
                            </Card>
                        </div>           
                ))}
                 </div>  
                <div className="row">{this.state.year}  </div>
                <div className="row">{this.state.month}    </div>
            </form>            
      

      </section>;
    }
  }

const mapStateToProps = state => ({
    comptimeList: state.comptime.comptimeList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comptimeCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompTime);

