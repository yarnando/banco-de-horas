import React, {Component} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as todolistActions } from '../../../store/ducks/todos'

class SecondaryPage extends Component {
  componentDidMount() {
    this.props.getTodolist()
  }
  render() { 
    return (
        <div>
          <div style={ {backgroundColor: "#ccc"} }>
            {this.props.loading && "carregando"}
          </div>
            {this.props.todoList.map( item => <div key={item.id}>{item.title}</div> )}
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