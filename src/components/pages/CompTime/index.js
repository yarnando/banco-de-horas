import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '../../shared/card'

const getDays = (month, year) => new Date(year, month, 0).getDate();

class CompTime extends Component {

    state = {
        year: "",
        month: "",
        numberOfDays: ""
    }

    changeYear = (e) => {
        this.setState({ month: "", numberOfDays: "" })
        this.setState({ year: e.target.value })        
    }

    changeMonth = (e) => {
        this.setState({ numberOfDays: "" })
        this.setState({ month: e.target.value }) 
        if(!!e.target.value == false) return 
        this.getDaysOfMonth(e, this.state.month, this.state.year)       
    }

    getDaysOfMonth = (e, month, year) => {
        e.preventDefault();
        let numberOfDays = new Date(year, month, 0).getDate()
        this.setState({ numberOfDays })
    }
    
    renderDays = () => {
        let items = [];
        for (let i = 1; i < this.state.numberOfDays; i++) {
            let item = {
                day: `${i}/${this.state.month}/${this.state.year}`,
                startingTime: '00:00',
                lunchStart: '00:00',
                lunchEnd: '00:00',
                stoppingTime: '00:00',
            }            
            items.push(item)        
        }  
        return items   
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
                            </select>
                        </div>                       
                    </div>                    
                </div>
                <div className="row">
                {this.renderDays().map( (item, index) => (
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
                <div className="row">{this.state.numberOfDays}   </div>
            </form>            
      

      </section>;
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

