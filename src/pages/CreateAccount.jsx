import axios from 'axios';
import InquizzNoBg from '../Images/Inquizzitive-nobg.jpg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SoundControl from "../components/SoundControl";

function CreateAccount () {
  let invalid;
  const navigate = useNavigate();
  const home = () =>  navigate('/');
  const loginpage = () => navigate('/login');
  const [inputs, setInputs] = useState("");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    setInputs('');
    inputs.email = inputs.email.toLowerCase();
    inputs.survivalscore = 0;
    inputs.infinityscore = 0;
    const instance = axios.create({
      baseURL: 'https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account',
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    instance.get('https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/accounts')
    .then(function (response){
      for (const key in response.data) {
        response.data[key].forEach(item => {
            if(inputs.email == item.email){
              const err = document.getElementById('errormsg');
              err.style.display = "block";
              err.innerHTML = "Email is already in use.";
              invalid = true;
            }
            else if(inputs.username == item.username){
              const err = document.getElementById('errormsg');
              err.style.display = "block";
              err.innerHTML = "Username is already in use.";
              invalid = true;
            }
            else{
              console.log("Not a match!")
            }
        });
      }
      if(invalid != true){
        instance.post('https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account', inputs)
          .then(function (response){
            console.log(response);
          })
          .catch(function (error){
            console.log(error);
          });
          navigate("/login");
      }
    })
    .catch(function (error){
      console.log(error);
    });
    
  };
  
  return (
    <>
      <img
          src={InquizzNoBg}
          height="300px"
          width="300px"
          className="splashimg"
          id="splashimg"
        />
      <h1 className="center" style={{animation: "fadeIn 0.6s"}}>Create Account</h1>
      <div className="center">
          <form onSubmit={handleSubmit} className="centerform">
            <label>
                Email: 
            </label>
            <div className="center">
              <input
                type ="text"
                name = "email"
                value = {inputs.email || ""}
                onChange = {handleChange}
                placeholder = "enter your email..."
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
                value = {inputs.password || ""}
                onChange = {handleChange}
                placeholder= "enter a password..."
                required
              />
            </div>
            <label>
                Display Name:
              </label>
            <div className="center">
              <input
                type ="text"
                name = "username"
                value = {inputs.username || ""}
                onChange = {handleChange}
                placeholder="enter a display name..."
              />
            </div>
            <div className="center">
                  <p id = "errormsg" style={{display: "none", color: "var(--danger)"}}></p>
            </div>
            <div className="center" style={{marginTop: "15px"}}>
              <input
                className="formbutton"
                type ="submit"
                value = "Create Account"
              />
              <div className="space"></div>
              <button className="button" onClick={loginpage} style={{animation: "none"}}>
              Back to Login
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
    </>
  );
}

export default CreateAccount;