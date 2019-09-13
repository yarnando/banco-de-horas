import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as comptimeCreators } from '../../../../store/ducks/comptime'

import Modal from '../../../shared/modal'

class components extends Component {

    handleInputChange = (e, field) => {
        const comptime = { ...this.props.comptime }
        comptime[field] = e.target.value
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

    render() {
        return <div>    
            <Modal showing={this.props.showingForm}
                   close={() => this.props.setShowingForm(false)}>
                    <h1>{this.props.comptime.day}</h1>
                    <form noValidate onSubmit={(e) => this.updateComptime(e)}>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>startingTime</label> 
                                    <input value={this.props.comptime.startingTime}
                                           onChange={(e) => this.handleInputChange(e, 'startingTime')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>lunchStart</label> 
                                    <input value={this.props.comptime.lunchStart}
                                           onChange={(e) => this.handleInputChange(e, 'lunchStart')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>lunchEnd</label> 
                                    <input value={this.props.comptime.lunchEnd}
                                           onChange={(e) => this.handleInputChange(e, 'lunchEnd')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                <div className="input-box">
                                    <label>stoppingTime</label> 
                                    <input value={this.props.comptime.stoppingTime}
                                           onChange={(e) => this.handleInputChange(e, 'stoppingTime')} type="text"/>
                                </div>                             
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid-item-6">
                                    <button>Salvar</button>                           
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
    showingForm: state.comptime.showingForm
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comptimeCreators, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(components);
