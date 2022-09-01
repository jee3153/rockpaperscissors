import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [winner, setWinner] = useState(null);
  const [matchStatus, setMatchStatus] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [computer, setComputer] = useState(null);
  const [you, setYou] = useState(null);
  const memes = {
    "lose": "https://c.tenor.com/HQMrSTJvxfsAAAAC/memepool-7septemberbuybtc.gif",
    "win": "https://c.tenor.com/Lk3D7fgHVYYAAAAC/well-done-golden-trophy.gif",
    "draw": "https://c.tenor.com/AdBjSG07MmEAAAAd/again-huh.gif"
  }

  DUMMY_SECRET = "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";

  useEffect(() => {
   if (winner) {
    updateImgSrc();
   } 
  
  },[winner, imgSrc]);

  useEffect(() => {
    if (computer != null && you != null) {
      whoWins();
    }
  },[you, computer]);

  const whoWins = () => {
    const winLoseMap = {
      "rock": "scissors",
      "paper": "rock",
      "scissors": "paper"
    }

  if (computer != null && you != null) {
    if (computer === you) {
      setWinner(() => 'draw')
    } else if (winLoseMap[you] === computer) {
      setWinner(() => 'you')
    } else if (winLoseMap[computer] === you) {
      setWinner(() => 'computer')
    } 
  }   
}
const updateImgSrc = () => {
  switch (winner) {
    case 'draw':
      setImgSrc(memes["draw"]);
      break;
    case 'you':
      setImgSrc(memes["win"]);
      break;
    case 'computer':
      setImgSrc(memes["lose"]);
      break;
  }
}
  const rockPaperScissors = () => {
    const rockPaperScissors = Math.floor(Math.random() * 3);
    switch (rockPaperScissors) {
      case 0:
        setComputer('rock')
        break;
      case 1:
        setComputer('paper')
      case 2:
        setComputer('scissors');
    }
  }

  const updateYou = (you) => {
    rockPaperScissors();
    setMatchStatus(true);
    setYou(you);
  }

  const playAgain = () => {
    setMatchStatus(false)
    setWinner(null)
    setImgSrc(null)
    setComputer(null)
    setYou(null)
  }

  return (
    <div className="App">
      <h1>{!matchStatus && `Let's play rock paper scissors`}</h1>
      <h1 >{computer && computer}</h1>
      <p>{matchStatus && `you threw ${you}`}</p>
      <div>
        <img src={imgSrc&&imgSrc} />
      </div>
      <button disabled={matchStatus ? true : false} onClick={() => updateYou('rock')}>Rock</button>
      <button disabled={matchStatus ? true : false} onClick={() => updateYou('paper')}>Paper</button>
      <button disabled={matchStatus ? true : false} onClick={() => updateYou('scissors')}>Scissors</button>
      {
        winner === 'draw' && <button onClick={() => playAgain()}>Again</button>
      }
    </div>
  );
}

export default App;
