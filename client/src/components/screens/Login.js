import React,{useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../../App';
function Login() {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const postData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
     return M.toast({html: "Inavalid Email",classes:"#d32f2f red darken-2"})
    }
    fetch("/signin",{
    method:"Post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      password,
      email
    })
    }).then(res => res.json())
    .then(data => { 
      if(data.error){
        M.toast({html: data.error,classes:"#d32f2f red darken-2"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user", JSON.stringify(data.savedUser))
        dispatch({type:"USER",payload:data.savedUser})
        M.toast({html:"Signed In  ",classes:"#43a047 green darken-1"})
        history.push('/')
      }
    }
      )
  }
  return (
     <div className="mycard">
     <div className="card auth-card input-field">
          <h2>Photogram</h2>
         
          <input 
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          
          <input 
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
 
          <button className="btn waves-effect waves-light #1e88e5 blue darken-1"  onClick={()=>postData()}>Login
    
              </button>
              <h5>
              <Link to='/signup'> Dont  have an Account ?  </Link>
            </h5>
            <h5>
              <Link to='/reset'>Forgot password ?  </Link>
            </h5>
                      </div>
     </div>

  );
}

export default Login;
