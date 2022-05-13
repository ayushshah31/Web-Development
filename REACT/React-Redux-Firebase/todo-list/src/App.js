import React , {Component} from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo'
class App extends Component {
    state = { 
        todos: [
            {id: 1, content:"Create a todo-list using react"},
            {id:2 , content: "Complete Net-Ninja react course of redux & firebase"}
        ]
    } 
    deleteTodo = (id) => {
        const newTodo = this.state.todos.filter(todo=>{
            return todo.id !== id;
        });
        this.setState({
            todos: newTodo
        })
    }
    addTodo = (todo)=>{
        console.log(todo);
        const newTodo = [...this.state.todos,todo];
        this.setState({
            todos: newTodo
        });
    }
    render() { 
        return (
            <div className="todo-app container">
                <h1 className='center blue-text'>Todo's</h1>
                < Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
                < AddTodo addTodo = {this.addTodo}/>
            </div>
        );
    }
}

export default App;