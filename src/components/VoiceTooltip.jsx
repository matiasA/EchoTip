import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generateVoiceAudio, translateToSpanish } from '../utils/llmService';
import './VoiceTooltip.css';

const VoiceTooltip = ({ text, voiceText, children, position = 'top', theme, onError }) => {
  const [visible, setVisible] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // Eliminamos la variable spanishText ya que no se está utilizando
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const prepareAudio = useCallback(async () => {
    if (audioUrl) return;
    setIsGenerating(true);
    setError(null);
    try {
      const textToTranslate = voiceText || text;
      console.log("Texto original:", textToTranslate);
      const translatedText = await translateToSpanish(textToTranslate);
      // Usamos directamente translatedText en lugar de guardarlo en un estado
      const url = await generateVoiceAudio(translatedText);
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
      if (onError) onError(err);
    } finally {
      setIsGenerating(false);
    }
  }, [text, voiceText, audioUrl, onError]);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log("Audio reproducido exitosamente"))
        .catch(error => {
          console.error("Error al reproducir audio:", error);
          setError("Error al reproducir el audio. Por favor, intente de nuevo.");
          // Reiniciar el estado del audio para forzar una nueva generación
          setAudioUrl(null);
          setIsAudioReady(false);
        });
    }
  }, []);

  useEffect(() => {
    if (visible && !audioUrl && !isGenerating) {
      prepareAudio();
    }
  }, [visible, audioUrl, isGenerating, prepareAudio]);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => {
    setVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`voice-tooltip ${position}`}
      style={theme}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div className="tooltip-text" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        <p>{text}</p>
        <button 
          onClick={(e) => { e.stopPropagation(); playAudio(); }}
          disabled={isGenerating || !isAudioReady}
          className={isGenerating ? 'generating' : ''}
        >
          {isGenerating ? '🔊 Generando...' : '🔊 Escuchar en español'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
};

VoiceTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  voiceText: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
  onError: PropTypes.func
};

// Cambiamos la exportación a default
export default VoiceTooltip;