import React , {Component} from 'react';

class AddTodo extends Component {
    state = {
        content: "",
        id: 3
    }
    handleChange = (e)=>{
        this.setState({
            content: e.target.value,
        });
    }
    handleSubmit = (e) => {
        var todoId = this.state.id+1;
        e.preventDefault();
        console.log(this.state);
        this.props.addTodo(this.state);
        this.setState({
            content: '',
            id: todoId
        });
    }
    render() { 
        return (
            <form onSubmit={this.handleSubmit} >
                <label>Add new Todo</label>
                <input type="text" onChange={this.handleChange} value={this.state.content}/>
            </form>
        );
    }
}

export default AddTodo;