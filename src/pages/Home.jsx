import InquizzNoBg from '../Images/Inquizzitive-nobg.jpg';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SoundControl from '../components/SoundControl';

function Home() {

    const navigate = useNavigate();
    const survivalPage = () => navigate('/survival');
    const infinityPage = () => navigate('/infinity');
    const leaderboardPage = () => navigate('/leaderboard');
    const accountPage = () => navigate('/account')
    const loginPage = () => navigate('/login');
    const handleLogout = () =>{
      const logout = document.getElementById('logout');
      const user = document.getElementById('user');
      user.style.display = "none";
      logout.style.display = "none";
      localStorage.clear();
      window.location.reload();     
    }
    useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if(loggedInUser) {
          const user = document.getElementById('user');
          const login = document.getElementById('login');
          const logout = document.getElementById('logout');
          logout.style.display = "block";
          user.style.display = "block";
          login.style.display = "none";
          user.innerHTML = loggedInUser;
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
                <div className="center">
                <button 
                  className="button" 
                  onClick={survivalPage}
                >
                  Survival
                </button>
                <div className="space">

                </div>
                <button 
                  className="button" 
                  onClick={infinityPage}
                >
                  Infinity
                </button>
                </div>
                <div className="center">
                <button 
                  className="button" 
                  onClick={leaderboardPage}
                >
                  Leaderboard
                </button>
                </div>
                <div className="center" style={{ margin: "auto" }}>
                <button 
                  id = "login"
                  className="button" 
                  onClick={loginPage}
                >
                  Login
                </button>
                <button 
                  id = "logout"
                  className="button" 
                  style={{display: "none", animation: "fadeIn 0.6s"}}
                  onClick={handleLogout}
                >
                  Logout
                </button>
                </div>
            </div>
            <h2 id = "user" className='center' style={{display : "none" , marginTop: "15px", animation: "fadeIn 0.6s", cursor: "pointer"}} onClick={accountPage}></h2>
            <div className="center">
              <SoundControl/>
            </div>
        </>

    )
}

export default Home