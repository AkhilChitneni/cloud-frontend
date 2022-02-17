
import './register.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Register() {

    let [username, setUsername] = useState('');
    let [password, setPassword]  = useState('');
    let [firstname, setFirstname]  = useState('');
    let [lastname, setLastname]  = useState('');
    let [email, setEmail]  = useState('');
    let [warning, setWarning] = useState('');
    const navigate = useNavigate();

    const routetoLogin = () => {
        navigate('./login');
    }

    const registerUser = () => {
        if (username!=='' && password!=='' && firstname!=='' && lastname!=='' && email!==''){
            const body = { 
                "username": username,
                "password" : password,
                "firstname" : firstname,
                "lastname" : lastname,
                "email" : email
            }; 
            axios.post('http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000/api/user/register/', body)
            .then(
                response => {
                    console.log(response.data)
                    //const genres = JSON.parse(localStorage.getItem('genres'))
                    let data = response.data
                    data["link"]=""
                    data["count"]=""
                    localStorage.setItem('userData', JSON.stringify(data))
                    navigate("/home");
                }
            )
            .catch(
                function(error){
                    
                    console.log(error)
                    setWarning(error.response.data['message'])
                }
            )

        }
        else{
            setWarning("Please Fill the Empty Feilds");
        }
        
    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }
    const changefirstname = async (event) => {
        setFirstname(event.target.value)
    }
    const changelastname = async (event) => {
        setLastname(event.target.value)
    }
    const changeemail = async (event) => {
        setEmail(event.target.value)
    }
    const changepassword = async (event) => {
        setPassword(event.target.value)
    }

  return (
    <div className="register">
      <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" >
                    <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <form className="mx-1 mx-md-4">

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c2" className="form-control" placeholder="Username" defaultValue={username} onChange={changeUsername}/>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c3" className="form-control" placeholder="First Name" defaultValue={firstname} onChange={changefirstname}/>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c" className="form-control" placeholder="Last Name" defaultValue={lastname} onChange={changelastname}/>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input type="email" id="form3Example3c" className="form-control" placeholder="email" defaultValue={email} onChange={changeemail}/>
                                
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4c" className="form-control" placeholder="Password" defaultValue={password} onChange={changepassword}/>       
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <div> Already a User? <span className="login-span" onClick={()=>routetoLogin()}>Login</span></div>
                            </div>
                            {
                                warning!=='' && 
                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <div className="text-warning">{warning}</div>
                            </div>
                            }


 

                           
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="button" className="btn btn-primary btn-lg" onClick={()=>registerUser()}>Register</button>
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

export default Register;
