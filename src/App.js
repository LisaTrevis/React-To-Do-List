import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import Todos from './components/Todos'
// import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import './App.css'

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => this.setState({ todos: res.data}))
  }

  toggleComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      return todo.id !== id ? todo : { ...todo, completed: !todo.completed };
    }) });
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
  }

  addTodo = (title) => {
    // Used for dev before HTTP JSON placeholder was added
    // const newTodo = {
    //   id: uuidv4(),
    //   // if key and value are the same, can just put it once
    //   title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] })) 
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} /> 
                <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/About" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
