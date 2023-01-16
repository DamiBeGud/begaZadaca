import React from 'react'
import { useState } from 'react'
function Auth({users, setCurrentUser,login}) {
    const info= {
        username:"",
        password:""
    }
    const[userInfo, setUserInfo] = useState(info)

    function handleClick(){
        
        users.forEach(element => {
            if(element.username === userInfo.username && element.password === userInfo.password){
                setCurrentUser(element)
                login()
            }
            
        });
    }
  return (
    <section>
        <form>
            <input type="text" name="username" placeholder='username' value={userInfo.username} onChange={(event)=>setUserInfo(prev=>{return{...prev, username: event.target.value}})} />
            <input type="password" name="password" placeholder='password' value={userInfo.password} onChange={(event)=>setUserInfo(prev=>{return{...prev, password: event.target.value}})} />
            <button type='button' onClick={()=>handleClick()}>Prijavi se</button>
        </form>
    </section>
  )
}

export default Auth