import React from 'react';
import VoiceTooltip from './VoiceTooltip';

const ExamplePage = () => {
  console.log('Renderizando ExamplePage');
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ejemplo de VoiceTooltip</h1>
      <p>Pasa el mouse sobre los elementos para ver y escuchar los tooltips:</p>
      
      <div style={{ marginBottom: '20px' }}>
        <VoiceTooltip 
          text="Este es un botón importante" 
          voiceText="Este botón realiza una acción crítica"
        >
          <button style={{ padding: '10px', fontSize: '16px' }}>Botón Importante</button>
        </VoiceTooltip>
      </div>
      
      <div>
        <VoiceTooltip 
          text="Información adicional" 
          voiceText="Aquí puedes encontrar más detalles sobre el producto"
          position="right"
        >
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Más info</span>
        </VoiceTooltip>
      </div>
    </div>
  );
};

export default ExamplePage;