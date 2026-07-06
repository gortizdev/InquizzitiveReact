import axios from 'axios';
import InquizzNoBg from '../Images/Inquizzitive-nobg.jpg';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SoundControl from "../components/SoundControl";

function Login () {
  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [, setUser] = useState();

  useEffect(() => {
      userRef.current.focus();
  }, [])

  const navigate = useNavigate();
  const home = () => navigate('/');
  const createaccountpage = () =>  navigate('/createaccount');
  const handleSubmit = async (e) =>{
      e.preventDefault();
      setEmail('');
      setPwd('');
      setEmail(email.toLowerCase());
      const instance = axios.create({
        baseURL: 'https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account',
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
      });
      instance.get('https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account?email='+ email)
      .then(function (response){
        if(response.status == 200 && response.data != null && response.data.password == pwd){
          setUser(response.data);
          localStorage.setItem('userdata', JSON.stringify(response.data));
          localStorage.setItem('user', JSON.stringify(response.data.username).slice(1,-1));
          localStorage.setItem('email', JSON.stringify(response.data.email).slice(1,-1));
          localStorage.setItem('password', JSON.stringify(response.data.password).slice(1,-1));
          localStorage.setItem('survivalscore', JSON.stringify(response.data.survivalscore));
          localStorage.setItem('infinityscore', JSON.stringify(response.data.infinityscore));
          navigate('/');

        }
        else{
          const err = document.getElementById('errormsg');
          err.style.display = "block";
          err.innerHTML = "Incorrect Username or Password.";
        }
      })

  }
  
  return (
    <>
        <section>
          <img
              src={InquizzNoBg}
              height="300px"
              width="300px"
              className="splashimg"
              id="splashimg"
          />
          <h1 className="center" style={{animation: "fadeIn 0.6s"}}>Login</h1>
          <div className="center">
              <form onSubmit={handleSubmit} className="centerform">
                <label>
                    Email: 
                </label>
                <div className="center">
                  <input
                    type ="text"
                    name = "email"
                    ref = {userRef}
                    autoCapitalize="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                    required
                  />
                </div>
                <label>
                    Password: 
                  </label>
                <div className="center">
                  <input
                    type ="password"
                    name = "password"
                    onChange={(e) => setPwd(e.target.value)}
                    value = {pwd}
                    required
                  />
                </div>
                <div className="center">
                  <p id = "errormsg" style={{display: "none", color: "var(--danger)"}}></p>
                </div>
                <div className="center" style={{marginTop: "15px"}}>
                  <input
                    className="formbutton"
                    type ="submit"
                    value = "Login"
                  />
                  <div className="space"></div>
                  <button className="button" onClick={createaccountpage} style={{animation: "none"}}>
                  Create Account
                  </button>
                </div>
              </form>
          </div>
          <div className="center">
            <SoundControl/>
            <button className="icnbtns" onClick={home}>
              <i className="material-icons">home</i>
            </button>
          </div>
        </section>
    </>
  );
}

export default Login;