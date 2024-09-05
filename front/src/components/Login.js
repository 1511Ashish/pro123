import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const {email, setEmail} = useState("")
    const {password, setPassword} = useState("")

    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:3001/api/v1/login", {
                email, password
            })
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Login page</h1>
      <form className="flex flex-col justify-center items-center gap-4"
      action='POST'>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='email'/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
            <input type='submit' onClick={submit}/>
      </form>
      <br/>
      <p>Or</p>
      <br/>
      <Link to="/signup">Signup Page</Link>
    </div>
  )
}

export default Login
