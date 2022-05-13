import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection , getDocs , addDoc , updateDoc, doc , deleteDoc } from '@firebase/firestore';

function App() {
    const [users,setUsers] = useState([]);
    const usersCollectionRef = collection(db,"users");

    const createUser = async(e) => {
        e.preventDefault();
        await addDoc(usersCollectionRef , {name:e.target.name.value, age:Number(e.target.age.value)});
    }

    const updateUser = async(id,age) => {
        const newField = {age: age+1};
        const user = doc(db , "users" , id);
        await updateDoc(user , newField);
    }

    const deleteUser = async(id) => {
        const user = doc(db , "users" , id);
        deleteDoc(user);
    }

    useEffect(()=>{
        const getUsers = async() => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map(doc => ({...doc.data() ,id: doc.id })));
            // console.log(users);
        }
        getUsers();
        // console.log("users: ",users);
    },[usersCollectionRef]);

  return (
    <div className="App">
        <form onSubmit = {createUser} >
            <input type="text" name='name' placeholder='name'/>
            <input type="number" name='age' placeholder='age'/>
            <button>Create User</button>
        </form>
        {users && users.map(user => {
            return (
                <div className="user" key={user.id}>
                    <h3>Name: {user.name}</h3>
                    <h3>Age: {user.age}</h3>
                    <button onClick={()=>updateUser(user.id,user.age)}>increase age</button>
                    <button onClick={()=> deleteUser(user.id)}> delete</button>
                </div>
            )
        })}
        <footer>© Ayush Shah</footer>
    </div>
  );
}

export default App;
