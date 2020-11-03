import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            backgroundColor: 'paleturquoise',
            padding: '10px',
            borderBottom: '1px black solid',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
        // Same as ternary code above
        // if(this.props.todo.completed) {
        //     return {
        //         textDecoration: 'line-through'
        //     }
        // } else {
        //     return {
        //         textDecoration: 'none'
        //     }
        // }
    }

    render() {
        // Using destructuring so I don't have to keep using this.props.todo in front of id and title in lines 30 and 31 below.
        const { id, title, completed } = this.props.todo
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" checked={completed} onChange={this.props.toggleComplete.bind(this, id)} /> {' '}
                    { title }
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>X</button>
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
  }

  const btnStyle = {
      background: 'lightpink',
      color: 'black',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '50%',
      cursor: 'pointer',
      float: 'right'
  }
  
export default TodoItem
