import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from '../../../../store/ducks/comptime'

import TimeInput from 'react-keyboard-time-input';

import Modal from '../../../shared/modal'
import Loading from '../../../shared/loading'

class components extends Component {

    handleInputChange = (e, field) => {
        if( (typeof e == 'string') && Number(e.substr(0,2)) > 23) return false        
        const comptime = { ...this.props.comptime }
        comptime[field] = e
        this.props.setComptime(comptime)
    } 

    updateComptime = async (e) => {
        e.preventDefault()
        if(this.checkTime('startingTime') == false ) return false
        if(this.checkTime('lunchStart') == false ) return false
        if(this.checkTime('lunchEnd') == false ) return false
        if(this.checkTime('stoppingTime') == false ) return false
        let id = this.props.comptimeListId
        let comptimeList = [...this.props.comptimeList]
        let comptimeIndex = comptimeList.findIndex( item => item.day == this.props.comptime.day)
        let hoursBank = await this.calcHoursBankOfDay(this.props.comptime)
        await this.handleInputChange(hoursBank, 'difference')       
        comptimeList[comptimeIndex] = { ...comptimeList[comptimeIndex], ...this.props.comptime }
        this.props.putComptimeList(
          this.props.auth.user.userId,
          this.props.yearSelected,
          this.props.monthSelected,
          id,
          comptimeList
        );    
        console.log(comptimeList)   
    }

    americanDate(date) {
        let datePart = date.match(/\d+/g),
        year = datePart[0].substring(0),
        month = datePart[1], day = datePart[2];
        return day+'-'+month+'-'+year;
    }   
    
    calcHoursBankOfDay(comptime) {
        let workSchedule = 8 //in hours
        
        let startingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['startingTime']}:00`)
        let stoppingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['stoppingTime']}:00`)
        let lunchStart = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchStart']}:00`)
        let lunchEnd = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchEnd']}:00`)

        let diffMsStartStop = (stoppingTime - startingTime);
        let diffMsLunchTime = (lunchEnd - lunchStart);
        let hoursDoneLunch = Math.floor((diffMsLunchTime % 86400000) / 3600000)
        let minutesDoneLunch = Math.round(((diffMsLunchTime % 86400000) % 3600000) / 60000) 
        //anulando o banco de horas gerado por bater a volta do almoço mais cedo do que 1 hora
        if(hoursDoneLunch < 1) {
            hoursDoneLunch = 1
            minutesDoneLunch = 0
        }  
        let hoursDone = (Math.floor((diffMsStartStop % 86400000) / 3600000) ) - (hoursDoneLunch)
        let minutesDone = Math.round(((diffMsStartStop % 86400000) % 3600000) / 60000) - (minutesDoneLunch)
        
        let totalDone = {
            hours: Number,
            minutes: Number
        }
        if((hoursDone >= workSchedule) || minutesDone == '00') {
            totalDone.hours = hoursDone - workSchedule
            totalDone.minutes = minutesDone
        } else {
            totalDone.hours =  (hoursDone - workSchedule) + 1
            totalDone.minutes = (60 - minutesDone) * -1
        }
        
        return totalDone
    }

    checkTime = (field) => {
        const comptime = { ...this.props.comptime }
        switch(field) {
            case 'startingTime':
                var startingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['startingTime']}:00`)
                var lunchStart = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchStart']}:00`)
                if(startingTime > lunchStart)
                {
                    alert('O horário de entrada deve ser anterior à hora de entrada do almoço.')
                    return false
                }
                break
            case 'lunchStart':
                var lunchStart = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchStart']}:00`)
                var startingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['startingTime']}:00`)
                var lunchEnd = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchEnd']}:00`)
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
                var lunchEnd = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchEnd']}:00`)
                var lunchStart = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchStart']}:00`)
                var stoppingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['stoppingTime']}:00`)
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
                var stoppingTime = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['stoppingTime']}:00`)
                var lunchEnd = new Date(`${this.americanDate(this.props.comptime.day)} ${comptime['lunchEnd']}:00`)
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
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>Entrada</label>
                                    <TimeInput value={this.props.comptime.startingTime} onChange={(e) => this.handleInputChange(e, 'startingTime')}/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>Entrada do almoço</label> 
                                    <TimeInput value={this.props.comptime.lunchStart}
                                           onChange={(e) => this.handleInputChange(e, 'lunchStart')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>Saída do almoço</label> 
                                    <TimeInput value={this.props.comptime.lunchEnd}
                                           onChange={(e) => this.handleInputChange(e, 'lunchEnd')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>Saída</label> 
                                    <TimeInput value={this.props.comptime.stoppingTime}
                                           onChange={(e) => this.handleInputChange(e, 'stoppingTime')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                    {this.props.loading ? <Loading loading={this.props.loading} size={22}/> : <button className="block">Salvar</button>}                          
                            </div>
                        </div>
                    </form>
            </Modal>        
        </div>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
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
