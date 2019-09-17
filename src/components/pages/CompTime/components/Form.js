import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from '../../../../store/ducks/comptime'

import TimeInput from 'react-keyboard-time-input';

import Modal from '../../../shared/modal'
import Loading from '../../../shared/loading'

class components extends Component {

    handleInputChange = (e, field) => {
        if(this.checkTime(field, e) == false ) return false
        const comptime = { ...this.props.comptime }
        comptime[field] = e
        this.props.setComptime(comptime)
    } 

    updateComptime = (e) => {
        e.preventDefault()
        let id = this.props.comptimeListId
        let comptimeList = [...this.props.comptimeList]
        let comptimeIndex = comptimeList.findIndex( item => item.day == this.props.comptime.day)
        comptimeList[comptimeIndex] = { ...comptimeList[comptimeIndex], ...this.props.comptime }
        console.log(comptimeList)
        this.props.putComptimeList(
          "idficticio",
          this.props.yearSelected,
          this.props.monthSelected,
          id,
          comptimeList
        );
    }

    checkTime = (field, time) => {
        const comptime = { ...this.props.comptime }
        console.log(field)
        switch(field) {
            case 'startingTime':
                var startingTime = new Date(`${this.props.comptime.day} ${time}:00`)
                var lunchStart = new Date(`${this.props.comptime.day} ${comptime['lunchStart']}:00`)
                if(startingTime > lunchStart)
                {
                    alert('O horário de entrada deve ser anterior à hora de entrada do almoço.')
                    return false
                }
                break
            case 'lunchStart':
                var lunchStart = new Date(`${this.props.comptime.day} ${time}:00`)
                var startingTime = new Date(`${this.props.comptime.day} ${comptime['startingTime']}:00`)
                var lunchEnd = new Date(`${this.props.comptime.day} ${comptime['lunchEnd']}:00`)
                if(lunchStart < startingTime)
                {
                    alert('O horário de almoço deve ser depois da hora de entrada.')
                    return false
                }
                if(lunchStart > lunchEnd)
                {
                    alert('O horário de entrada do almoço deve ser anterior a hora de saida do almoço.')
                    return false
                }
                break
            case 'lunchEnd':
                var lunchEnd = new Date(`${this.props.comptime.day} ${time}:00`)
                var lunchStart = new Date(`${this.props.comptime.day} ${comptime['lunchStart']}:00`)
                var stoppingTime = new Date(`${this.props.comptime.day} ${comptime['stoppingTime']}:00`)
                if(lunchEnd < lunchStart)
                {
                    alert('O horário de saída do almoço deve ser depois da hora de entrada do almoço.')
                    return false
                }
                if(lunchEnd > stoppingTime)
                {
                    alert('O horário de saída do almoço deve ser anterior à hora de saída.')
                    return false
                }
                break
            case 'stoppingTime':
                var stoppingTime = new Date(`${this.props.comptime.day} ${time}:00`)
                var lunchEnd = new Date(`${this.props.comptime.day} ${comptime['lunchEnd']}:00`)
                if(stoppingTime < lunchEnd)
                {
                    alert('O horário de saída deve ser maior que o horário de saída do almoço.')
                    return false
                }
                break
            default:
                return true
        }
    }

    render() {
        return <div>    
            <Modal showing={this.props.showingForm}
                   close={() => this.props.setShowingForm(false)}>
                    <h1>{this.props.comptime.day}</h1>
                    <form noValidate onSubmit={(e) => this.updateComptime(e)}>
                        {JSON.stringify(this.props.comptime.startingTime)}
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>startingTime</label>
                                    <TimeInput value={this.props.comptime.startingTime} onChange={(e) => this.handleInputChange(e, 'startingTime')}/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>lunchStart</label> 
                                    <TimeInput value={this.props.comptime.lunchStart}
                                           onChange={(e) => this.handleInputChange(e, 'lunchStart')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>lunchEnd</label> 
                                    <TimeInput value={this.props.comptime.lunchEnd}
                                           onChange={(e) => this.handleInputChange(e, 'lunchEnd')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>stoppingTime</label> 
                                    <TimeInput value={this.props.comptime.stoppingTime}
                                           onChange={(e) => this.handleInputChange(e, 'stoppingTime')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                    {this.props.loading ? <Loading loading={this.props.loading} size={22}/> : <button>Salvar</button>}                          
                            </div>
                        </div>
                    </form>
            </Modal>        
        </div>;
    }
}

const mapStateToProps = state => ({
    yearSelected: state.comptime.yearSelected,
    monthSelected: state.comptime.monthSelected,
    comptime: state.comptime.comptime,
    comptimeList: state.comptime.comptimeList,
    comptimeListId: state.comptime.comptimeListId,
    showingForm: state.comptime.showingForm,
    loading: state.global.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comptimeCreators, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(components);
