import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { creators as authActions } from '../../../../store/ducks/auth'

import Loading from '../../../shared/loading'

class Signup extends Component {

    state = {
        passwordError: "",
        emailError: ""
    }

    handleInputChange = (e, field) => {
        const { user } = this.props.auth
        user[field] = e.target.value
        this.props.user(user)
        if(field == 'email') this.validateEmail()
        if(field == 'password') this.validatePassword()
    }

    validateEmail = () => {
        let email = this.props.auth.user.email
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.setState({ emailError: "" })
        } else {
            this.setState({ emailError: "Por favor, digite um e-mail válido." })
        }
    }
    validatePassword = () => {
        let password = this.props.auth.user.password
        if(password.length >= 6) {
            this.setState({ passwordError: "" })
        } else {
            this.setState({ passwordError: "A senha deve ter, pelo menos, 6 caracteres." })
        }        
    }

    validateAndSignUp = (e) => {
        e.preventDefault()
        if(this.validateEmail() ) return false
        if(this.validatePassword() ) return false
        this.props.signUp()
    }

    render() {
        return <div className="flex flex-1 content-center align-center">
            <div className="container container-sm mb-4">
                <h1 className="text-center pt-4">Cadastro</h1>
                {this.props.message && 
                <div className="text-center pt-4">
                    <span>{this.props.message}</span>
                </div>}                
                <form noValidate onSubmit={(e) => this.validateAndSignUp(e)}>
                    <div className="row">
                        <div className="grid-item-6">
                            <div className="input-box">
                                <label>Digite um Email</label>
                                <input value={this.props.auth.user.email} onChange={(e) => this.handleInputChange(e, 'email')}/>
                                { this.state.emailError && <span className="errorMsg">{this.state.emailError}</span>}
                            </div>                             
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid-item-6">
                            <div className="input-box">
                                <label>Digite uma Senha</label>
                                <input type="password" value={this.props.auth.user.password} onChange={(e) => this.handleInputChange(e, 'password')}/>
                                { this.state.passwordError && <span className="errorMsg">{this.state.passwordError}</span>}
                            </div>                             
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid-item-6">
                            <div style={{ alignSelf: 'center' }}>
                                {this.props.loading ? <Loading loading={this.props.loading} size={22}/> : <button className="primary">Cadastrar</button>}
                            </div>
                            <div>
                                <button type="button" onClick={() => this.props.history.push("/signin")}>Já possui cadastro?</button> 
                            </div>                 
                        </div>
                    </div>
                </form>    
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    message: state.global.message.text,
    loading: state.global.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
