import React, { Component } from "react";
import "./styles.css";

export default class Header extends Component {

    state = {
        active: true,
        statusClasses: ''
    }

    componentDidMount() {
        window.innerWidth >= 555 ? this.setState({ statusClasses: '' }) : this.setState({ statusClasses: 'slideFadeHeader-off' })
        window.addEventListener('resize', () => {
            if(window.innerWidth >= 555) {
                this.setState({ statusClasses: '' })
            } else {
                this.setState({ statusClasses: 'slideFadeHeader-off' })
            }
        });        
    }    

    transitionClass() {
        this.setState({ active: !this.state.active })
        this.state.active ? this.setState({ statusClasses: 'slideFadeHeader-on' }) : this.setState({ statusClasses: 'slideFadeHeader-off' })
    }    

    render() {
        return (
            <div className="header">
                <div className="header__titleContainer">
                    <h1 className="header__title">{this.props.title}</h1>
                    {
                        this.props.navItems && 
                        <button
                            className="header__navButton"
                            onClick={() => this.transitionClass()}>
                            <span className="icon-menu"></span>
                        </button>
                    }
                </div>
                <div
                    className={`header__navbar ${this.state.statusClasses}`}
                >
                    <ul>
                        {!!this.props.navItems && this.props.navItems.map( (item,index) => 
                            {
                                return (
                                    <li key={index}>
                                        {
                                            item.type !== 'routerlink' ? 
                                            <a href={item.link}>{item.title}</a> :
                                            <a href="" onClick={() => this.props.history.push(item.link)}>{item.title}</a> 
                                        }
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}
