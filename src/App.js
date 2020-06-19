import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {

  const canvasRef = useRef()

  const draw = () => {
    let canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const player = document.getElementById('player');
    context.drawImage(player, 0, 0, canvas.width, canvas.height)
    player.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: true
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      const player = document.getElementById('player');
      player.srcObject = stream;
    });



  return (
    <div className="App">
      <canvas id="canvas" ref={canvasRef} style={{ width: '320px', height: '240px' }}></canvas>
      <video id="player" controls autoplay></video>
      <button id="capture" onClick={draw}>Capture</button>
    </div>
  );
}

export default App;
