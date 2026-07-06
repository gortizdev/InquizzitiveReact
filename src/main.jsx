import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios';
import music from '../src/Music/Menu.mp3'
import './index.css'
let genre;
let genreid;
let mode;
let score;
const audio = new Audio(music);
audio.loop = true;
const savedvolume = parseFloat(localStorage.getItem('volume'));
audio.volume = Number.isNaN(savedvolume) ? 0.7 : savedvolume;

export function setVolume(value){
  audio.volume = parseFloat(value);
  localStorage.setItem('volume', audio.volume);
}
export function getVolume(){
  return audio.volume;
}

// Autoplay on page start; browsers block audio until the user interacts
// with the page, so fall back to starting on the first click/keypress.
function startMusic(e){
  // Let the sound button's own toggle handle the gesture instead.
  if (e && e.target.closest && e.target.closest('#sound')) return;
  audio.play().then(() => {
    document.removeEventListener('pointerdown', startMusic);
    document.removeEventListener('keydown', startMusic);
  }).catch(() => {});
}
startMusic();
document.addEventListener('pointerdown', startMusic);
document.addEventListener('keydown', startMusic);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export function muteunmute(){
  // The user has taken over playback control; stop the autoplay fallback
  // so it can't restart music they deliberately paused.
  document.removeEventListener('pointerdown', startMusic);
  document.removeEventListener('keydown', startMusic);
  if(audio.paused)
  {
      audio.play();
  }
  else{
      audio.pause();
  }
}
export function sgamestart(clicked_id, clicked_genre){
  genreid = clicked_id;
  genre = clicked_genre;
  mode = 'survival';
  const grid = document.getElementById('grid');
  const img = document.getElementById('splashimg');
  const quiz = document.getElementById('quiz');
  const loadimg = document.getElementById('loadimg');
  loadimg.classList.add("fadeIn");
  loadimg.style.display = "block";
  setTimeout(function()
  {
      grid.style.display = "none";
      img.style.display = "none";
      quiz.classList.add("fadeIn");
      apigrabber();
          
  }, 100)
  
}
export function igamestart(clicked_id, clicked_genre){
  genreid = clicked_id;
  genre = clicked_genre;
  mode = 'infinity';
  const grid = document.getElementById('grid');
  const img = document.getElementById('splashimg');
  const quiz = document.getElementById('quiz');
  const exit = document.getElementById('exit');
  const loadimg = document.getElementById('loadimg');
  const space = document.getElementById('space');
  loadimg.classList.add("fadeIn");
  loadimg.style.display = "block";
  space.style.display = "none";
  setTimeout(function()
  {
      grid.style.display = "none";
      img.style.display = "none";
      quiz.classList.add("fadeIn");
      exit.style.display = "block";
      apigrabber();
          
  }, 100)
  
}
function apigrabber(){
  (async () => {
      const tokendata = await fetchAPIData('https://opentdb.com/api_token.php?command=request')
      const token = tokendata.token;
      questionsetup(token);
  })()
}
async function fetchAPIData(link){
  try {
      let response = await fetch(link);
      let data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching token data:', error);
  }
}
function decodeHtml(encoded) {
  var text = document.createElement("textarea");
  text.innerHTML = encoded;
  return text.value;
}
function questionshuffle(answers){
  return answers.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}
function questionsetup(token){
  document.getElementById('quizheader').textContent = genre;
  (async () => {
      const quizdata = await fetchAPIData('https://opentdb.com/api.php?amount=1&token=' + token + "&category=" + genreid)
      const questions = quizdata.results;
      const q = questions[0].question;
      document.getElementById('question').textContent = decodeHtml(q);
      const correct = questions[0].correct_answer;
      let answers = questions[0].incorrect_answers;
      const ansbtns = document.getElementById('answer-buttons');
      const scorebox = document.getElementById('score');
      score = scorebox.textContent;
      const nextbutton = document.getElementById('nxt');
      const quiz = document.getElementById('quiz');
      const space = document.getElementById('space');
      const loadimg = document.getElementById('loadimg');
      loadimg.style.display = "none";
      quiz.style.display = "block";
      answers.push(correct);
      answers = questionshuffle(answers);
      answers.forEach(answer =>{
          const button = document.createElement("button");
          button.innerHTML = decodeHtml(answer);
          button.classList.add("ansbtn");
          button.id = decodeHtml(answer);
          ansbtns.appendChild(button);
          button.addEventListener("click", (e) => {
              const clicked = e.target;
              if (clicked.textContent == decodeHtml(correct)){
                  clicked.style.background = "green";
                  clicked.style.color = "black";
                  score++;
                  scorebox.textContent = score;
              }
              else{
                  clicked.style.background = "red";
                  clicked.style.color = "black";
              }
              Array.from(ansbtns.children).forEach(button=>{
                  if(button.textContent == decodeHtml(correct)){
                      button.style.background = "green";
                      button.style.color = "black";
                  }
                  button.disabled = true;
              })
              if (mode == 'infinity'){
                space.style.display = "block";
              }
              nextbutton.textContent = "Next Question";
              nextbutton.style.display = "block";
              nextbutton.addEventListener("click", () => {
                  if (mode == 'survival' && clicked.style.background == "red"){
                      if (parseInt(score) > parseInt(localStorage.getItem('survivalscore'))){
                          console.log("New High Survival Score!");
                          localStorage.setItem('survivalscore', score);
                          let update ={"email": localStorage.getItem('email'), "updateKey" : "survivalscore" , "updateValue" : parseInt(localStorage.getItem('survivalscore'))}; 
                          axios.patch('https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account', update)
                          .then(function (response){
                            console.log(response);
                          })
                          .catch(function (error){
                            console.log(error);
                          });
                      }
                      endGame();
                  }
                  else if(mode == 'infinity'){
                      space.style.display = "none";
                      nextbutton.style.display = "none";
                      nextbutton.replaceWith(nextbutton.cloneNode(false));
                      resetstate(token);
                  }
                  else{
                      nextbutton.style.display = "none";
                      nextbutton.replaceWith(nextbutton.cloneNode(false));
                      resetstate(token);
                  }
                  
              })
          });
      });
  })()    
}
function resetstate(token){
  (async () => {
      console.log(score);
      const ansbtns = document.getElementById('answer-buttons');
      while(ansbtns.firstChild){
          ansbtns.removeChild(ansbtns.firstChild);
      }
      const quiz = document.getElementById('quiz');
      const loadimg = document.getElementById('loadimg');
      loadimg.style.display = "block";
      quiz.style.display = "none";
      setTimeout(function()
      {
          questionsetup(token);       
      }, 3000)
  })()
}
export function infinityendGame(){
  if (parseInt(score) > parseInt(localStorage.getItem('infinityscore'))){
    console.log("New High Infinity Score!");
    localStorage.setItem('infinityscore', score);
    let update ={"email": localStorage.getItem('email'), "updateKey" : "infinityscore" , "updateValue" : parseInt(localStorage.getItem('infinityscore'))}; 
    axios.patch('https://ocqgyz1dnd.execute-api.us-east-1.amazonaws.com/production/account', update)
    .then(function (response){
      console.log(response);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  const quiz = document.getElementById('quiz');
  quiz.style.display = "none";
  const endimg = document.getElementById('loadimg');
  endimg.style.display = "block";
  const gameend = document.getElementById('gameend');
  gameend.classList.add('fadeIn');
  gameend.style.display= "block";
  const fscore = document.getElementById('fscore');
  fscore.innerHTML = "Final Score: " + score;
}
export function endGame(){
  const quiz = document.getElementById('quiz');
  quiz.style.display = "none";
  const endimg = document.getElementById('loadimg');
  endimg.style.display = "block";
  const gameend = document.getElementById('gameend');
  gameend.classList.add('fadeIn');
  gameend.style.display= "block";
  const fscore = document.getElementById('fscore');
  fscore.innerHTML = "Final Score: " + score;
}

