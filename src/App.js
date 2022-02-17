
import './App.css';
import Register from './register/register';
import Login from './login/login';
import Home from './home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    
  </Router>

  );
}

export default App;


