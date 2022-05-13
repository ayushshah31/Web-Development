

const Todos = ({todos, deleteTodo}) => {
    const todoList = todos.length>0 ? 
    (todos.map(
        todo => <div className="collection-item" key={todo.id}>
                    <span onClick={()=>deleteTodo(todo.id)} className="todo-item">{todo.content} </span>
                </div>)) 
                : 
            (<p className="center">You have no Todo's Left , YAY!</p>)

    return ( 
        <div className="collection todos">
            {todoList}
        </div>
    );
}

export default Todos;