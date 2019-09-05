import React, {Component} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as todolistActions } from '../../../store/ducks/todos'

import Header from '../../shared/header'
import Loading from '../../shared/loading'

class SecondaryPage extends Component {
    state = {
        navItems: [
            { type: "routerlink", link: "/test0", title: "title0" },
            { type: "routerlink", link: "/test1", title: "title1" },
            { type: "anchor", link: "/test2", title: "title2" }
        ]        
    }
  render() { 
    return (
        <div>
            <Header title="Template" navItems={this.state.navItems} />
            <div className="container">
                <button className="content-center align-center" onClick={() => this.props.getTodolist()}>
                    {this.props.loading ? <div className="flex"><span>Loading... </span><Loading loading={true} size={20} /></div> : "Load Todolist"}
                </button>
                {this.props.todoList.map( item => 
                    <div className="row" key={item.id}>
                        <div className="grid-item-6">
                            --- {item.title}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  todoList: state.todos.todoList,
  loading: state.global.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(todolistActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryPage)