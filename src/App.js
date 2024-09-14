import React from 'react';
import VoiceTooltip from './components/VoiceTooltip'; // Cambiamos la importación
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>EchoTip Demo</h1>
      <VoiceTooltip text="Este es un botón importante" voiceText="Este botón realiza una acción crítica">
        <button className="demo-button">Botón Importante</button>
      </VoiceTooltip>
    </div>
  );
}

export default App;