import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generateVoiceAudio, translateToSpanish } from '../utils/llmService';
import './VoiceTooltip.css';  // Importa los estilos CSS para el componente

// Componente VoiceTooltip que crea un tooltip con capacidad de texto a voz
const VoiceTooltip = ({ text, voiceText, children, position = 'top', theme, onError }) => {
  // Estados para manejar la visibilidad y el estado del audio
  const [visible, setVisible] = useState(false);  // Controla la visibilidad del tooltip
  const [audioUrl, setAudioUrl] = useState(null);  // Almacena la URL del audio generado
  const [isAudioReady, setIsAudioReady] = useState(false);  // Indica si el audio está listo para reproducirse
  const [isGenerating, setIsGenerating] = useState(false);  // Indica si se está generando el audio
  const [spanishText, setSpanishText] = useState('');  // Almacena el texto traducido al español
  const [error, setError] = useState(null);  // Almacena cualquier error que ocurra
  const audioRef = useRef(null);  // Referencia al elemento de audio

  // Función para preparar el audio (traducir y generar)
  const prepareAudio = useCallback(async () => {
    if (audioUrl) return;  // Si ya hay un audio generado, no hace nada
    setIsGenerating(true);
    try {
      const textToTranslate = voiceText || text;  // Usa voiceText si está disponible, si no, usa text
      console.log("Texto original:", textToTranslate);
      const translatedText = await translateToSpanish(textToTranslate);  // Traduce el texto al español
      setSpanishText(translatedText);
      const url = await generateVoiceAudio(translatedText);  // Genera el audio del texto traducido
      if (url) {
        setAudioUrl(url);
        setIsAudioReady(true);
        console.log("Audio listo para reproducir");
      } else {
        throw new Error("No se pudo generar la URL del audio");
      }
    } catch (err) {
      console.error("Error al preparar el audio:", err);
      setError(err.message);
      if (onError) onError(err);  // Llama a la función onError si se proporciona
    } finally {
      setIsGenerating(false);
    }
  }, [text, voiceText, audioUrl, onError]);

  // Función para reproducir el audio
  const playAudio = () => {
    if (!isAudioReady) {
      // Si el audio no está listo, lo prepara y luego lo reproduce
      prepareAudio().then(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Audio reproducido exitosamente"))
            .catch(error => console.error("Error al reproducir audio:", error));
        }
      });
    } else if (audioRef.current) {
      // Si el audio ya está listo, lo reproduce directamente
      audioRef.current.play()
        .then(() => console.log("Audio reproducido exitosamente"))
        .catch(error => console.error("Error al reproducir audio:", error));
    }
  };

  // Funciones para mostrar y ocultar el tooltip
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => {
    setVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;  // Reinicia el audio cuando se oculta el tooltip
    }
  };

  // Renderizado del componente
  return (
    <div
      className={`voice-tooltip ${position}`}  // Aplica clases CSS para posicionar el tooltip
      style={theme}  // Aplica estilos personalizados si se proporcionan
      onMouseEnter={showTooltip}  // Muestra el tooltip al pasar el mouse
      onMouseLeave={hideTooltip}  // Oculta el tooltip al quitar el mouse
    >
      {children}  // Renderiza el contenido hijo (el elemento al que se aplica el tooltip)
      <span className="tooltip-text" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        {text}  // Muestra el texto del tooltip
        <button 
          onClick={(e) => { e.stopPropagation(); playAudio(); }}  // Reproduce el audio al hacer clic
          disabled={isGenerating}  // Deshabilita el botón mientras se genera el audio
          className={isGenerating ? 'generating' : ''}  // Aplica una clase CSS cuando se está generando
        >
          {isGenerating ? '🔊 Generando...' : '🔊 Escuchar en español'}  // Cambia el texto del botón según el estado
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}  // Muestra errores si los hay
      </span>
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}  // Elemento de audio oculto
    </div>
  );
};

// Definición de los tipos de props para el componente
VoiceTooltip.propTypes = {
  text: PropTypes.string.isRequired,  // Texto del tooltip (obligatorio)
  voiceText: PropTypes.string,  // Texto alternativo para la voz (opcional)
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),  // Posición del tooltip
  theme: PropTypes.object,  // Estilos personalizados
  children: PropTypes.node.isRequired,  // Elemento hijo (obligatorio)
  onError: PropTypes.func  // Función para manejar errores (opcional)
};

export { VoiceTooltip };