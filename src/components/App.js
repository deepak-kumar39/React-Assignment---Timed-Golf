import React, { useState, useEffect } from "react";
import "../styles/App.css";

function App(){

  const [time,setTime]=useState(0);
  const [renderBall,setRenderBall]=useState(false);
  const [ballPosition,setBallPosition]=useState({left: 0,top: 0});
  const [holePosition,setHolePosition]=useState({left: 250,top: 250});
  
  let timer;
  const onKeyDown = (event) => { 
    switch(event.keyCode){
        case 39:
        setBallPosition({
            left:ballPosition.left+5,
            top:ballPosition.top
        })
        break;
        case 40:
        setBallPosition({
            left:ballPosition.left,
            top:ballPosition.top+5
        })
        break;
        case 37:
        setBallPosition({
            left:ballPosition.left-5,
            top:ballPosition.top
        })
        break;
        case 38:
        setBallPosition({
            left:ballPosition.left,
            top:ballPosition.top-5
        })
        break;
        default:
        break;
    }
  }
    

 useEffect(()=>{
  document.addEventListener("keydown",onKeyDown);
  {(ballPosition.left===holePosition.left&&ballPosition.top===holePosition.top)?
    (reset()
    )
    

    :""}
  return () => { document.removeEventListener("keydown", onKeyDown);}
 },[ballPosition]);


  const reset=()=>{
    clearTimeout(timer);
    alert(time);
    setTimeout(()=>{
      setTime(0);
    },0);
    setRenderBall(false);
    setBallPosition({left: 0,top: 0});
    setHolePosition({left: 250,top: 250});
  }

  const buttonClickHandler=()=> {
    setRenderBall(true);
  }

  const renderBallOrButton=()=>{
    if (renderBall) {
        timer=setTimeout(()=>{
          setTime(time+1);
        },1000);
        return (  
          <>
          <div className="ball" style={{
            left:ballPosition.left+"px",
            top:ballPosition.top+"px",
            position:"absolute"
          }}></div>
          <div className="hole" style={{
            left:holePosition.left+"px",
            top:holePosition.top+"px",
            position:"absolute"
          }}></div>
          <div className="heading-timer">{time}</div>
        </>);
    } else{
        return <button onClick={buttonClickHandler} className="start">Start</button>
    }
  }

  return (
    <div>
        {renderBallOrButton()}
    </div>
  )
}

export default App;
