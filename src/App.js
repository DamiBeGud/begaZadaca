
import { useState, useEffect } from "react";
import Auth from "./pages/Auth"
import Home from "./pages/Home"
function App() {
  const users = [
    {
      id:"1",
      username: "admin",
      password: "admin",
      role:"admin"
    },
    {
      id:"2",
      username: "korisnik",
      password: "korisnik",
      role:"korisnik"
    }
  ]
  const [curentUser, setCurrentUser] = useState()
  
  const[isLogged, setIsLogged] = useState(false)

  function login(){
    setIsLogged(!isLogged)
  }
  
  return (
    <main>
      {isLogged === false &&
       <Auth
       users={users}
       setCurrentUser={setCurrentUser}
       login={login}
        />}
      {isLogged && <Home 
        curentUser={curentUser}
        login={login}
      />}
    </main>
  );
}

export default App;
