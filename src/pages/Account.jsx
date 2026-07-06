import InquizzNoBg from '../Images/Inquizzitive-nobg.jpg';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SoundControl from '../components/SoundControl';

function Home() {

    const navigate = useNavigate();
    const home = () => navigate('/');
    const handleLogout = () =>{
      localStorage.clear();
      navigate('/');   
    }
    const showhide = () =>{
        const password = document.getElementById('password');
        if (password.textContent == "Pass: ******"){
            password.innerHTML = "Pass: " + localStorage.getItem('password');
        }
        else{
            password.innerHTML = "Pass: ******";
        }
    }
    useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if(loggedInUser) {
          const user = document.getElementById('user');
          const email = document.getElementById('email');
          const survivalscore = document.getElementById('survivalscore');
          const infinityscore = document.getElementById('infinityscore');
          user.innerHTML = "Username: " + loggedInUser;
          email.innerHTML = "Email: " + localStorage.getItem('email');
          
          survivalscore.innerHTML = "Survival High Score: " + localStorage.getItem('survivalscore');
          infinityscore.innerHTML = "Infinity High Score: " + localStorage.getItem('infinityscore');
      }
      else{
        console.log("No one is logged in!");
      }
    },[])

    return (
        <>
            <img
                src = {InquizzNoBg}
                className="mainsplashimg"
                style={{ margin: "auto" }}
                alt = "not loading"
            />
            <div className="buttoncontainer">
                <div>
                    <h2 id = "user" className='center' style={{marginTop: "15px", animation: "fadeIn 0.6s"}}></h2>
                </div>
                <div>
                    <h2 id = "email" className='center' style={{marginTop: "15px", animation: "fadeIn 0.6s"}}></h2>
                </div>
                <div>
                    <h2 id = "password" className='center' style={{marginTop: "15px", animation: "fadeIn 0.6s"}}>Pass: ******</h2>
                    
                </div>
                <div className='center'>
                    <button id = "show/hide" className = "button" onClick={showhide}>Show Password</button>
                </div>
                <div>
                    <h2 id = "survivalscore" className='center' style={{marginTop: "15px", animation: "fadeIn 0.6s"}}></h2>
                </div>
                <div>
                    <h2 id = "infinityscore" className='center' style={{marginTop: "15px", marginBottom: "15px", animation: "fadeIn 0.6s"}}></h2>
                </div>
                <button 
                  id = "logout"
                  className="button" 
                  style={{display: "block", animation: "fadeIn 0.6s"}}
                  onClick={handleLogout}
                >
                  Logout
                </button>
            </div>
            
            <div className="center">
              <SoundControl/>
              <button className="icnbtns" onClick={home}>
                <i className="material-icons">home</i>
              </button>
            </div>
        </>

    )
}

export default Home