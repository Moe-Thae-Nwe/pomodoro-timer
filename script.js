import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"))
const beep = document.getElementById("beep")

function App() {
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)
  const [minutesLeft, setMinutesLeft] = React.useState(sessionLength)
  let [secondsLeftShown, setSecondsLeftShown] = React.useState("00")
  let [secondsLeft, setSecondsLeft] = React.useState(0)
  const [minutesLeftShown, setMinutesLeftShown] = React.useState(minutesLeft)
  const [timerLabel, setTimerLabel] = React.useState("Session")
  let timeLeft = `${minutesLeftShown}:${secondsLeftShown}`
  const [status, setStatus] = React.useState("Start")
  const [isRunning, setIsRunning] = React.useState(false)
  
  const btn = {
    marginLeft: 10,
    marginRight: 10,
  }
  
  const p = {
    display: 'inline'
  }
  
  const center = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
  function reset() {
    setBreakLength(5)
    setSessionLength(25)
    setTimerLabel("Session")
    setMinutesLeft(sessionLength)
    setSecondsLeftShown("00")
    setStatus("Start")
    setIsRunning(false)
    setSecondsLeft(0)
    setMinutesLeftShown(25)
    beep.pause()
    beep.currentTime = 0
  }
  
  function breakDecrement() {
    if (!(breakLength <= 1)) {
      setBreakLength(prevBreakLength => prevBreakLength - 1)
      if(timerLabel == "Break") { 
        setMinutesLeft(breakLength - 1)
       
        if (minutesLeft < 11) {
        setMinutesLeftShown("0" + (breakLength - 1))
      } else {
         setMinutesLeftShown(breakLength - 1)
      }
      }
    }
  }

  function breakIncrement() {
    if (breakLength < 60) {
      setBreakLength(prevBreakLength => prevBreakLength + 1)
      if(timerLabel == "break") { 
        setMinutesLeft(breakLength + 1)
if (minutesLeft < 9) {
        setMinutesLeftShown("0" + (breakLength + 1))
      } else {
         setMinutesLeftShown(breakLength + 1)
      }
      }
    }
  }

  function sessionDecrement() {
    if (!(sessionLength <= 1)) {
      setSessionLength(prevSessionLength => prevSessionLength - 1) 
      if(timerLabel == "Session") { 
        setMinutesLeft(sessionLength - 1)
       if (minutesLeft < 11) {
        setMinutesLeftShown("0" + (sessionLength - 1))
      } else {
         setMinutesLeftShown(sessionLength - 1)
      }
      }
    }
  }
  
  function sessionIncrement() {
    if (sessionLength < 60) {
      setSessionLength(prevSessionLength => prevSessionLength + 1)
      if(timerLabel == "Session") { 
        setMinutesLeft(sessionLength + 1)
       if (minutesLeft < 9) {
        setMinutesLeftShown("0" + (sessionLength + 1))
      } else {
         setMinutesLeftShown(sessionLength + 1)
      }
      }
    }
  }

  function startStop() {
    setIsRunning(prevIsRunning => !prevIsRunning)
    setStatus(isRunning ? "Start" : "Stop")
  }
  
  React.useEffect(() => {
    if (!isRunning) {
      return
    } else {
    const intervalId = setInterval(()=> {
      if (sessionLength < 0) {
        setSessionLength(1)
        if (timerLabel == "Session") {
          setMinutesLeft(1)
          setMinutesLeftShown("01")
        }
      }
      if (breakLength < 0) {
        setBreakLength(1)
        if (timerLabel == "Break") {
          setMinutesLeft(1)
          setMinutesLeftShown("01")
        }
      }
      if (secondsLeft > 0) {
        setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1)
        setSecondsLeftShown(secondsLeft < 11 ? ("0" + (secondsLeft - 1)) : secondsLeft - 1)
      } else if (secondsLeft == 0) {
        setSecondsLeft(59)
        setSecondsLeftShown(59)
        setMinutesLeft(prevMinutesLeft => prevMinutesLeft - 1)
        setMinutesLeftShown(minutesLeft < 10 ? ("0" + (minutesLeft - 1)) : (minutesLeft - 1))
      } else if (secondsLeft <= 0 && minutesLeft <= 0) {
        setSecondsLeft(0)
        setSecondsLeftShown("00")
        if (timerLabel == "Session") {
          setMinutesLeft(breakLength)
          setTimerLabel("Break")
          if (breakLength < 10) {
            setMinutesLeftShown("0" + breakLength)
          } else {
            setMinutesLeftShown(breakLength)
          }
        } else if (timerLabel == "Break") {
          setMinutesLeft(sessionLength)
          setMinutesLeftShown(sessionLength)
          setTimerLabel("Session")
          if (sessionLength < 10) {
            setMinutesLeftShown("0" + sessionLength)
          } else {
            setMinutesLeftShown(sessionLength)
          } 
      }
      }
      if (timeLeft == "00:00") {
        beep.play()
        setSecondsLeft(0)
        setSecondsLeftShown("00")
        if (timerLabel == "Session") {
          setMinutesLeft(breakLength)
          setTimerLabel("Break")
          if (breakLength < 10) {
            setMinutesLeftShown("0" + breakLength)
          } else {
            setMinutesLeftShown(breakLength)
          }
        } else {
          setMinutesLeft(sessionLength)
          setMinutesLeftShown(sessionLength)
          setTimerLabel("Session")
          if (sessionLength < 10) {
            setMinutesLeftShown("0" + sessionLength)
          } else {
            setMinutesLeftShown(sessionLength)
          }
      }
    }}, 1000)
    return()=> clearInterval(intervalId)
  }}, [isRunning, minutesLeft, secondsLeft, timerLabel])
  return(
    <>
      <div id = "length">
        <div>
          <p id = "break-label">Break Length</p>
          <button id = "break-decrement" onClick = {breakDecrement} style = {btn}>-</button>
          <p id = "break-length" style = {p}>{breakLength}</p>
          <button id = "break-increment" onClick = {breakIncrement} style = {btn}>+</button>
        </div>
        <div>
          <p id = "session-label">Session Length</p>
          <button id = "session-decrement" onClick = {sessionDecrement} style = {btn}>-</button>
           <p id = "session-length" style = {p}>{sessionLength}</p>
          <button id = "session-increment" onClick = {sessionIncrement} style = {btn}>+</button>
        </div>
      </div>
      <div style = {center}>
        <p id = "timer-label">{timerLabel}</p>
        <p id = "time-left">{timeLeft}</p>
        <div>
          <button id = "start_stop" onClick = {startStop} style = {btn}>{status}</button>
          <button id = "reset" onClick = {reset} style = {btn}>Reset</button>
        </div>
      </div>
    </>
  )
}

root.render(<App />)
