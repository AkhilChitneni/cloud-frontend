
import './home.css';
import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
function Home() {

    let [username, setUsername] = useState('');
    let [Firstname, setFirstname]  = useState('');
    let [Lastname, setLastname]  = useState('');
    let [email, setEmail]  = useState('');
    let [link, setLink] = useState('');
    let [count, setCount] = useState('');
    let [selectedfile, setSelectedFile] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userData')){
            const userData = JSON.parse(localStorage.getItem('userData'))
            setUsername(userData['Username'])
            setFirstname(userData['Firstname'])
            setLastname(userData['Lastname'])
            setEmail(userData['email'])
            console.log(link)
            let linkdata = "http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000" + userData['link']
            setLink(linkdata)
            setCount(userData['count'])
        }
        else{
            navigate("/");
        }
        
      })

    const LogoutUser = () => {
        localStorage.clear();
        navigate("/");
    }

    const onFileChange = event => { 
        // Update the state 
        console.log(event)
        setSelectedFile(event.target.files[0]); 
    };

    const onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file',selectedfile);
       
        axios.post("http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000/api/user/upload-file/", formData)
        .then(
            response => {
                let data = JSON.parse(localStorage.getItem('userData'))
                console.log(response.data)
                data['link']=response.data.data['link']
                data['count']=response.data.data['count']
                let linkdata = "http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000" + response.data.data['link']
                setLink(linkdata)
                setCount(data['count'])
                console.log(data)
                localStorage.setItem('userData', JSON.stringify(data))
            }
        ); 
      }; 

    

  return (
<div className="register">
      <section className="vh-100">
            <div className="container h-100">
            
                <div className="row d-flex justify-content-end  h-100">
                <div className="d-flex justify-content-end align-items-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={()=>LogoutUser()}>Logout</button>
                </div>
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" >
                    <div className="card-body p-md-3">
                        
                        <div className="row justify-content-center">
                        <div className="col-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    `                   
                        <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Profile</p>
                        
                        <p className="h3 fw-bold mb-4  mt-4">Information</p>
                        <hr/>
                        <div className='row'>
                            <div className='col-4 m-1 fw-bold'>User Name </div>
                            <div className='col-6 m-1'>{username}</div>
                        </div>

                        <div className='row'>
                            <div className='col-4 m-1 fw-bold'>First Name</div>
                            <div className='col-6 m-1' >{Firstname}</div>
                        </div>

                        <div className='row'>
                            <div className='col-4 m-1 fw-bold'>Last Name </div>
                            <div className='col-6 m-1'>{Lastname}</div>
                        </div>

                        <div className='row'> 
                            <div className='col-4 m-1 fw-bold'>Email </div>
                            <div className='col-6 m-1 mb-2'>{email}</div>
                        </div>





                        {
                            link!=="http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000" &&
                            <div>
                            <p className="h3 fw-bold mb-4  mt-4">File Data</p>
                            <hr/>
                            <div className='row'> 
                            <div className='col-4 m-1 fw-bold'>File Uploaded </div>
                            <div className='col-6 m-1'><a href={link} target="_blank">{link}</a></div>
                            <div className='row'> 
                            <div className='col-4 m-1 fw-bold' >Count </div>
                            <div className='col-6 m-1'>{count}</div>
                            </div>
                            </div>
                            <div> 
                            <input class="form-control" type="file" id="formFile" onChange={onFileChange} />
                            <div className="d-flex justify-content-center mx-4 my-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg" onClick={()=>onFileUpload()}> 
                            Re-Upload
                            </button> 
                            </div>
                            </div> 
                            </div>
                        }

                        {
                            link=="http://ec2-3-144-244-180.us-east-2.compute.amazonaws.com:8000" &&
                            <div> 
                            <input class="form-control" type="file" id="formFile" onChange={onFileChange} />
                            <div className="d-flex justify-content-center mx-4 my-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg" onClick={()=>onFileUpload()}> 
                            Upload
                            </button> 
                            </div> 
                            </div>

                        }

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

export default Home;
