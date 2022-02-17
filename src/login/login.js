
import './login.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword]  = useState('');
    let [warning, setWarning] = useState('');
    const navigate = useNavigate();
    const changeUsername = (event) => {
        setUsername(event.target.value)
    }
    const changepassword = async (event) => {
        setPassword(event.target.value)
    }
    const loginUser = () => {
        const body = { 
                "username": username,
                "password" : password,
        }; 
        axios.post('http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000/api/user/login/', body)
        .then(response => 
            {
                console.log(response.data)
                localStorage.setItem('userData', JSON.stringify(response.data))
                navigate("/home");
            } 
        )
        .catch(
            function(error){
                console.log(error.response.data['message'])
                setWarning("Invalid Username or Password.")
            }
        );
    }

    const routetoRegister = () => {
        navigate('/');
    }

  return (
    <div className="login">
    <section className="vh-100">
          <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                  <div className="card text-black" >
                  <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                          <form className="mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example1c" className="form-control" placeholder="Username" defaultValue={username} onChange={changeUsername}/>
                              </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4c" className="form-control" placeholder="Password" defaultValue={password} onChange={changepassword}/>       
                              </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <div> New User? <span className="login-span" onClick={()=>routetoRegister()}>Register</span></div>
                            </div>
                            {
                                warning!='' && 
                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <div className="text-warning">{warning}</div>
                            </div>
                            }
                  
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="button" className="btn btn-primary btn-lg" onClick={()=>loginUser()}>Login</button>
                          </div>

                          </form>

                      </div>
                      
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          </div>
</section>
  </div>
  );
}

export default Login;
