import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Signup = () => {

  const [user, setUser] = useState({
    fullName:"", email:"", contactNumber:"", password:"", cnfrmpassword:"" 
  });
  let name, value;
  const handleInputs=(e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value

    setUser({...user, [name]:value})
  }
  const PostData = async(e) =>{
    e.preventDefault();
    console.log(user)
    const configuration = {
      method:"POST",
      url: "http://localhost:3000/api/v1/users/register",
       headers: {
              'Content-Type': 'application/json',
          },
      data: {
        user
      },
    };
    await axios(configuration)
    .then((result) => {console.log(result);})
    .catch((error) => {console.log(error);})
  }
  //   const {fullName, email, contactNumber, password, cnfrmpassword} = user;
    
  //   const res = await fetch("http://localhost:3000/api/v1/users/register",{
  //     method: "POST",

  //     headers:{
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fullName, email, contactNumber, password, cnfrmpassword
  //     })
  //   });
  //   const data =  res.json();
  //   if(data.status === 401 || 500 || !data){
  //     window.alert("Invalid registration");
  //     console.log("Invalid registration");
  //   }else{
  //     window.alert("successful registration");
  //     console.log("successful registration");
  //   }
  // }
  

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Signup page</h1>
      <form className='flex flex-col justify-center items-center gap-4'
      >
            <input type="text" 
            name='fullName'
            value={user.name}
            onChange={handleInputs}
            placeholder='name'/>
            
            <input type="email" 
            name='email'
            value={user.email}
            onChange={handleInputs}
            placeholder='email'/>
            
            <input type="number" 
            name='contactNumber'
            value={user.contactNumber}
            onChange={handleInputs}
            placeholder='contactNumber'/>
            
            <input type="password" 
            name='password'
            value={user.password}
            onChange={handleInputs}
            placeholder='password'/>
            
            <input type="password" 
            name='cnfrmpassword'
            value={user.cnfrmpassword}
            onChange={handleInputs}
            placeholder="cnfrmPassword"/>
            
            <button onClick={PostData}>Submit</button>
      </form>
      <br/>
      <p>Or</p>
      <br/>
      <Link to="/login">Login Page</Link>
    </div>
  );
}
export default Signup
