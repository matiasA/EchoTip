import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generateVoiceAudio, translateToSpanish } from '../utils/llmService';
import './VoiceTooltip.css';  // Añade esta línea

const VoiceTooltip = ({ text, voiceText, children, position = 'top', theme, onError }) => {
  const [visible, setVisible] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [spanishText, setSpanishText] = useState('');
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const prepareAudio = useCallback(async () => {
    if (audioUrl) return; // Si ya tenemos una URL de audio, no hacemos nada
    setIsGenerating(true);
    try {
      const textToTranslate = voiceText || text;
      console.log("Texto original:", textToTranslate);
      const translatedText = await translateToSpanish(textToTranslate);
      setSpanishText(translatedText);
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

  const playAudio = () => {
    if (!isAudioReady) {
      prepareAudio().then(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Audio reproducido exitosamente"))
            .catch(error => console.error("Error al reproducir audio:", error));
        }
      });
    } else if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log("Audio reproducido exitosamente"))
        .catch(error => console.error("Error al reproducir audio:", error));
    }
  };

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
      <span className="tooltip-text" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        {text}
        <button 
          onClick={(e) => { e.stopPropagation(); playAudio(); }}
          disabled={isGenerating}
          className={isGenerating ? 'generating' : ''}
        >
          {isGenerating ? '🔊 Generando...' : '🔊 Escuchar en español'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </span>
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

export { VoiceTooltip };