import InquizzNoBg from '../Images/Inquizzitive-nobg.jpg';
import LoadImg from '../Images/Inquizzitive-nobg-logo.png';
import { useNavigate } from "react-router-dom";
import  { sgamestart } from '../main';
import SoundControl from '../components/SoundControl';
import { useEffect } from "react";
function Survival() {
    const navigate = useNavigate();
    const home = () =>  navigate('/');
    useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if(loggedInUser) {
          const user = document.getElementById('user');
          user.style.display = "block";
          user.innerHTML = loggedInUser;
      }
      else{
        console.log("No one is logged in!");
      }
    },[])
    return (
      <>
      <img
        src={InquizzNoBg}
        height="300px"
        width="300px"
        className="splashimg"
        id="splashimg"
      />
      <div className="grid-container" id="grid">
        <div
          className="grid-item"
          id={9}
          onClick = {() => sgamestart(9,document.getElementById(9).innerHTML)}
        >
          Random
        </div>
        <div
          className="grid-item"
          id={10}
          onClick = {() => sgamestart(10,document.getElementById(10).innerHTML)}
        >
          Books
        </div>
        <div
          className="grid-item"
          id={11}
          onClick = {() => sgamestart(11,document.getElementById(11).innerHTML)}
        >
          Film
        </div>
        <div
          className="grid-item"
          id={12}
          onClick = {() => sgamestart(12,document.getElementById(12).innerHTML)}
        >
          Music
        </div>
        <div
          className="grid-item"
          id={13}
          onClick = {() => sgamestart(13,document.getElementById(13).innerHTML)}
        >
          Musicals &amp; Theatre
        </div>
        <div
          className="grid-item"
          id={14}
          onClick = {() => sgamestart(14,document.getElementById(14).innerHTML)}
        >
          Television
        </div>
        <div
          className="grid-item"
          id={15}
          onClick = {() => sgamestart(15,document.getElementById(15).innerHTML)}
        >
          Video Games
        </div>
        <div
          className="grid-item"
          id={16}
          onClick = {() => sgamestart(16,document.getElementById(16).innerHTML)}
        >
          Board Games
        </div>
        <div
          className="grid-item"
          id={17}
          onClick = {() => sgamestart(17,document.getElementById(17).innerHTML)}
        >
          Science &amp; Nature
        </div>
        <div
          className="grid-item"
          id={18}
          onClick = {() => sgamestart(18,document.getElementById(18).innerHTML)}
        >
          Computers
        </div>
        <div
          className="grid-item"
          id={19}
          onClick = {() => sgamestart(19,document.getElementById(19).innerHTML)}
        >
          Mathematics
        </div>
        <div
          className="grid-item"
          id={20}
          onClick = {() => sgamestart(20,document.getElementById(20).innerHTML)}
        >
          Mythology
        </div>
        <div
          className="grid-item"
          id={21}
          onClick = {() => sgamestart(21,document.getElementById(21).innerHTML)}
        >
          Sports
        </div>
        <div
          className="grid-item"
          id={22}
          onClick = {() => sgamestart(22,document.getElementById(22).innerHTML)}
        >
          Geography
        </div>
        <div
          className="grid-item"
          id={23}
          onClick = {() => sgamestart(23,document.getElementById(23).innerHTML)}
        >
          History
        </div>
        <div
          className="grid-item"
          id={24}
          onClick = {() => sgamestart(24,document.getElementById(24).innerHTML)}
        >
          Politics
        </div>
        <div
          className="grid-item"
          id={25}
          onClick = {() => sgamestart(25,document.getElementById(25).innerHTML)}
        >
          Art
        </div>
        <div
          className="grid-item"
          id={26}
          onClick = {() => sgamestart(26,document.getElementById(26).innerHTML)}
        >
          Celebrities
        </div>
        <div
          className="grid-item"
          id={27}
          onClick = {() => sgamestart(27,document.getElementById(27).innerHTML)}
        >
          Animals
        </div>
        <div
          className="grid-item"
          id={28}
          onClick = {() => sgamestart(28,document.getElementById(28).innerHTML)}
        >
          Vehicles
        </div>
        <div
          className="grid-item"
          id={29}
          onClick = {() => sgamestart(29,document.getElementById(29).innerHTML)}
        >
          Comics
        </div>
        <div
          className="grid-item"
          id={30}
          onClick = {() => sgamestart(30,document.getElementById(30).innerHTML)}
        >
          Gadgets
        </div>
        <div
          className="grid-item"
          id={31}
          onClick = {() => sgamestart(31,document.getElementById(31).innerHTML)}
        >
          Anime &amp; Manga
        </div>
        <div
          className="grid-item"
          id={32}
          onClick = {() => sgamestart(32,document.getElementById(32).innerHTML)}
        >
          Animation
        </div>
      </div>
      <div className="center">
        <img
          src={LoadImg}
          height="300px"
          width="300px"
          className="loadimg"
          id="loadimg"
        />
      </div>
      <div className="quiz" id="quiz">
        <h1 id="quizheader">Simple Quiz</h1>
        <div className="quizqs">
          <h2 id="question" />
          <div id="answer-buttons"></div>
          <button className="nxtbtn" id="nxt">
            Next Question
          </button>
        </div>
        <div className="scorecenter">
          <p>Score:</p>
          <p id="score">0</p>
        </div>
      </div>
      <div
        id="gameend"
        className="center"
        style={{ display: "none", paddingBottom: 0 }}
      >
        <img
          src={LoadImg}
          height="350px"
          width="350px"
          className="endimg"
          id="endimg"
        />
        <h1 id="gameover">Game Over</h1>
        <h1 id="fscore">Final Score: </h1>
      </div>
      <h2 id = "user" className='center' style={{display : "none" , marginTop: "15px", animation: "fadeIn 0.6s"}}></h2>
      <div className="center">
        <SoundControl/>
        <button className="icnbtns" onClick={home}>
          <i className="material-icons">home</i>
        </button>
      </div>
    </>
    );
}

export default Survival;