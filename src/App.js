import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [form, setForm] = useState({});
const [users, setUsers] = useState([]);

const handleForm = (e) =>{
setForm ({
...form,
[e.target.name] : e.target.value
})
}


const handlSubmit = async (e) => {
e.preventDefault();
const response = await fetch('http://localhost:2000/data',{
  method: 'POST',
  body:JSON.stringify(form),
  headers:{
    'Content-Type':'application/json'
  }
})
const data = await response.text();
console.log(data);
}

const getUsers = async ()=>{
const response = await fetch('http://localhost:2000/data',{
  method: 'GET',
})
const data = await response.json();
setUsers(data);
}

useEffect(()=>{
getUsers();
},[])



return (
<div>
  <form onSubmit={handlSubmit}>
    <p>{JSON.stringify(form)}</p>
    <span>Username</span>
    <input type="text" name="username" onChange={handleForm}></input>   
    <span>Message</span>  
    <input type="text" name="message" onChange={handleForm}></input>     
    <input type="submit"></input>
  </form>
  <div>
<ul>
  {users.map(users=><li key={users._id}>{users.username} <p>{users.message}</p></li>)}
</ul>
  </div>
</div>
) 
}

export default App;
