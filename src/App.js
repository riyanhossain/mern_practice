import { useEffect, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';

function App() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user,setUser]=useState({
    name:'',
    email:'',
    salary:'',
    gender:'',
    date:''
  })
  const [value, setValue] = useState(null);
  // const handleDate = () =>{
  //     setUser({...user, 'date':value})
  //     console.log(user);

  // }
  const [userInfo,setUserInfo]=useState([])
  let name, value1;
  const handleInputs = (e) => {
    name = e.target.name;
    value1 = e.target.value;
    setUser({...user, [name]:value1})
    console.log(user);
  }
  const handleSelect = (e) =>{
    setUser({...user, [e.target.name]:e.target.value})
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
  })
  const deleteUserInfo = (id) =>{
    fetch(`http://localhost:5000/delete/${id}`,{
      method: 'DELETE',
    })
    .then(res => {
      return res.json()
    }) 
    .then(data => console.log(data))
  }
  const [updateUser,setUpdateUser]=useState({})
  const userInfoUpdate = (id) =>{
    fetch(`http://localhost:5000/userData/${id}`)
    .then(res=> res.json())
    .then(data => {
      setUpdateUser(data)
    })

  }
  const handleModalInputs= (e) =>{
    name = e.target.name;
    value1 = e.target.value;
    setUpdateUser({...updateUser, [name]:value1})
    console.log(updateUser);

  }
  const updateUserInfo = (id) =>{
    fetch(`http://localhost:5000/update/${id}`,{
      method: 'PATCH',
      headers: {'Content-type' : 'application/json'},
      body : JSON.stringify(updateUser)
  })
    .then(res => {
      return res.json()
    }) 
    .then(data => console.log(data))
    
  }
  return (
    <main className='flex justify-center flex-col items-center'>
      <div className='h-[450px] w-[450px] bg-gray-100 rounded flex justify-center items-center'>
        <div className=' flex flex-col justify-center w-5/6'>
          <form className='gap-y-4 flex flex-col justify-center'>
            <p className='font-bold'>Give ur info</p>
            <input placeholder='Name' type="text" name='name' className='bg-gray-200 p-2' value={user.name} onChange={handleInputs} required/>
            <input placeholder='Email' type="email" name='email' className='bg-gray-200 p-2' value={user.email} onChange={handleInputs} required/>
            <input placeholder='Salary' type="number" name='salary' className='bg-gray-200 p-2' value={user.salary} onChange={handleInputs} required/>
            <select name="gender" id=""  className='bg-gray-200 p-2' onChange={handleSelect}>
              <option type="text" value='Not spcified' name='gender' >Gender</option>
              <option type="text" value='Male' name='gender' >Male</option>
              <option type="text" value='Female' name='gender' >Female</option>
              <option type="text" value='Others' name='gender'>Others</option>
            </select>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
              label="Join date"
              value={value}
              minDate={new Date('2022-01-01')}
              inputFormat="dd.MM.yyyy"
              onChange={(newValue) => {
                setValue(newValue)
                setUser({...user,['date']:newValue})
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            </Stack>
          </LocalizationProvider>
            <button type='submit' className='p-2 bg-blue-600 rounded text-white' onClick={handleClick}>Submit</button>
          </form>
        </div> 
      </div>
      <table className='border-2 border-gray-400'>
        <tr>
        <th className='border-2 border-gray-400 bg-sky-500'>Name</th>
        <th className='border-2 border-gray-400 bg-sky-500'>Email</th>
        <th className='border-2 border-gray-400 bg-sky-500'>Salary</th>
        <th className='border-2 border-gray-400 bg-sky-500'>Gender</th>
        <th className='border-2 border-gray-400 bg-sky-500'>Date</th>
        <th className='border-2 border-gray-400 bg-sky-500'>Action</th>
        </tr>

        {
          userInfo.map(data=><tr className='bg-sky-200'>
            <td className='border-2 border-gray-400 p-3'>{data.name}</td>
            <td className='border-2 border-gray-400 p-3'>{data.email}</td>
            <td className='border-2 border-gray-400 p-3'>{data.salary}</td>
            <td className='border-2 border-gray-400 p-3'>{data.gender}</td>
            <td className='border-2 border-gray-400 p-3'>{data.date}</td>
            <td className=''><button className='bg-amber-400 p-1 pl-4 pr-4 w-full text-white' onClick={()=>{handleOpen(); userInfoUpdate(data._id)}} >Update</button><br/>
            <button className='bg-red-600 p-1 w-full text-white' onClick={()=>deleteUserInfo(data._id)}>Delete</button></td>
          </tr>)
        }
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='h-[450px] w-[450px] bg-gray-100 rounded flex justify-center items-center'>
        <div className=' flex flex-col justify-center w-5/6'>
          <form className='gap-y-4 flex flex-col justify-center'>
            <p className='font-bold'>Give ur info</p>
            <input placeholder='Name' type="text" name='name' className='bg-gray-200 p-2' value={updateUser.name} onChange={handleModalInputs}/>
            <input placeholder='Email' type="email" name='email' className='bg-gray-200 p-2' value={updateUser.email} onChange={handleModalInputs}/>
            <input placeholder='Salary' type="number" name='salary' className='bg-gray-200 p-2' value={updateUser.salary} onChange={handleModalInputs}/>
            <button type='submit' className='p-2 bg-blue-600 rounded text-white'onClick={() => updateUserInfo(updateUser._id)} >Submit</button>
          </form>
        </div>
      </div>

        </Box>
      </Modal>
    </main>
  );
}

export default App;
