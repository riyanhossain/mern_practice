import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user,setUser]=useState({
    name:'',
    email:'',
    salary:''
  })
  const [userInfo,setUserInfo]=useState([])
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
    console.log(user);
  }
  const handleClick =() =>{
    fetch('http://localhost:5000/userInfo', {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body : JSON.stringify(user)
  })
  .then(res => res.json())
  .them(data=> console.log(data))
  }

  useEffect(()=>{
    fetch('http://localhost:5000/userData')
    .then(res => res.json())
    .then(data => {
      setUserInfo(data)
      console.log(data);
    })
  },[])
  return (
    <main className='flex justify-center'>
      <div className='h-[450px] w-[450px] bg-gray-100 rounded flex justify-center items-center'>
        <div className=' flex flex-col justify-center w-5/6'>
          <form className='gap-y-4 flex flex-col justify-center'>
            <input placeholder='Name' type="text" name='name' className='bg-gray-200 p-2' value={user.name} onChange={handleInputs}/>
            <input placeholder='Email' type="email" name='email' className='bg-gray-200 p-2' value={user.email} onChange={handleInputs}/>
            <input placeholder='Salary' type="number" name='salary' className='bg-gray-200 p-2' value={user.salary} onChange={handleInputs}/>
            <button type='submit' className='p-2 bg-blue-600 rounded text-white' onClick={handleClick}>Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
