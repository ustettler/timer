import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);
  const [selectedCountdownTime, setSelectedCountdownTime] = useState(10); // Standard Countdown-Zeit in Sekunden
  const [countdownFinished, setCountdownFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setSeconds(seconds => seconds + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    let countdownInterval = null;
    if (countdownActive && countdownSeconds > 0) {
      countdownInterval = setInterval(() => {
        setCountdownSeconds(countdownSeconds => countdownSeconds - 1);
      }, 1000);
    } else if (countdownSeconds === 0) {
      setCountdownActive(false);
      clearInterval(countdownInterval);
      setCountdownFinished(true);
    }

    return () => clearInterval(countdownInterval);
  }, [countdownActive, countdownSeconds]);

  const startCountdown = () => {
    setCountdownActive(true);
    setCountdownSeconds(selectedCountdownTime);
    setCountdownFinished(false);
  };

  const startCount = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    setCountdownFinished(false);
  };

  return (
    <div className={`app ${countdownFinished ? 'countdown-finished' : ''}`}>
      <div>
      <h1>{currentTime}</h1>
      <br/>
        <h1>Stopuhr</h1>
        <div className="timer">{seconds}s</div>
        <div className="buttons">
          <button onClick={startCount}>Start</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <div>
      <br/>
      <hr/>
        <h1>Countdown Timer</h1>
        <div>
          <label htmlFor="countdownTime">Countdown Time: </label>
          <input
            type="number"
            id="countdownTime"
            value={selectedCountdownTime}
            onChange={(e) => setSelectedCountdownTime(parseInt(e.target.value))}
          />
          <br/>
          <br/>
         
        </div>
        <div className="timer">{countdownSeconds}s</div>
      </div>
      <button onClick={startCountdown}>Start Countdown</button>
    </div>
  );
}

export default App;