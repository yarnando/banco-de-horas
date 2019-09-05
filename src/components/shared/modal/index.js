import React, { Component } from "react";
import "./styles.css";

export default class Modal extends Component {

    state = {
        statusClasses: "slideFadeModal-on",
        showingContainer: false,
        modalShowing: false,
        modalType: {}
    };

    componentDidMount() {
        this.modalType();
    }

    modalType() {
        if(this.props.type == 'error') {
            this.setState( {modalType: { type: 'error', icon: 'icon-cross'} })
        } else if(this.props.type == 'success') {
            this.setState( {modalType: { type: 'success', icon: 'icon-checkmark'} })
        } else if(this.props.type == 'loading') {
            this.setState( {modalType: { type: 'loading', icon: 'icon-spinner11'} })
        } else {
            this.setState( {modalType: { type: 'default', icon: ''} })
        }
    }    

    showModal() {
        //wait for the background appear (this.props.showing == true) and set modalShowing true, making the transition execute
        //called on componentDidUpdate
        setTimeout(() => {
            this.setState({ modalShowing: true });
        }, 100);
    }

    //wait for the modal to disappear and hides background, called on modal button "close"
    hideModal() {
        this.setState({ modalShowing: false });
        setTimeout(() => {
            this.props.close();
        }, 700);
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (newProps.showing !== oldProps.showing && newProps.showing == true)
            this.showModal();
    }

    render() {
        return this.props.showing && (
                    <div className="modalContainer">
                        <div
                            className={`msgBox ${
                                this.state.modalShowing ? "slideFadeModal-on" : "slideFadeModal-off"
                                }`}
                        >
                            <div className={`${this.state.modalType.type}MsgText`}>
                                <span className={`${this.state.modalType.icon} iconElement`}></span>
                                {this.props.children}
                            </div>
                            <button onClick={() => this.hideModal()}> Close</button>
                        </div>
                    </div>
                )
    }
}
