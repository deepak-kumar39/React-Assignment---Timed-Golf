import React, { Component, useState } from "react";
import "../styles/App.css";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      renderBall:false, 
      time: 0, 
      x: 0, 
      y: 0,
      top:0,
      left:0,
      srartTime:0,
    };
    this.buttonClickHandler=this.buttonClickHandler.bind(this);
    this.handeleventlistner=this.handeleventlistner.bind(this);
    this.tick=this.tick.bind(this);
  }

  buttonClickHandler(){
    document.addEventListener("keydown",this.handeleventlistner);
    clearInterval(this.timerID);
    this.setState({renderBall:true, time: 0, x: 0, y: 0 ,top:0,left:0,startTime:Date.now()})
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    if(!(this.state.x ==250 &&this.state.y==250)){
      let timePassed= Date.now() - this.state.startTime ;
      let sec=Math.floor(timePassed/(1000));
      this.setState({
      time:sec
      });
    }
  }

  handeleventlistner(e){
    let code=e.keyCode;
    
    if(code==39 && !(this.state.x ==250 &&this.state.y==250)){
        this.setState({
            x: this.state.left+5, y: this.state.top ,top:this.state.top,left:this.state.left+5
        });
    }
    if(code==37  && !(this.state.x ==250 &&this.state.y==250)){
        
        this.setState({
          
         x: this.state.left-5, y: this.state.top ,top:this.state.top,left:this.state.left-5
      });
    }
    if(code==38 && !(this.state.x ==250 &&this.state.y==250)){
        this.setState({
          
          x: this.state.left, y:this.state.top-5 ,top:this.state.top-5,left:this.state.left
      });
    }
    if(code==40 && !(this.state.x ==250 &&this.state.y==250)){
        this.setState({
          
          x:this.state.left, y: this.state.top+5 ,top:this.state.top+5,left:this.state.left
      });
    }
    if(this.state.x==250 && this.state.y==250){
      alert("Time taken by you:"+this.state.time);
      clearInterval(this.timerID);
      this.setState({renderBall:false, time: 0, x: 0, y: 0 ,top:0,left:0,startTime:0})
      document.removeEventListener("keydown",this.handeleventlistner);
    }
  }

    renderBallOrButton(){
    if (this.state.renderBall) {
        return (  
          <>
          <p  style={{color:"red", textAlign:"end",fontSize:"1rem"}}>Press Arrow keys to move ball</p>
          <div className="ball" style={{ position:"absolute",top:this.state.top +"px",
          left:this.state.left +"px",}}></div>
          <div className="hole" ></div>
          <div className="heading-timer" style={{fontSize:"2rem"}}>{"Time:"+this.state.time}</div>
        </>
        );
    } 
    else
        return (
          <>
          <h1 style={{textAlign:"center"}}>Welcome to Timed golf</h1>
          <h2 style={{textAlign:"center", color:"red"}}>Press start to play</h2>
        <button onClick={this.buttonClickHandler} className="start">Start</button>
        </>)
  }

  render(){
    return (
      <div>
          {this.renderBallOrButton()}
      </div>
    )
  }
}

export default App;