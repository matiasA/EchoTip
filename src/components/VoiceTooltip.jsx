import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { generateVoiceText } from '../utils/llmService';

const VoiceTooltip = ({ text, voiceText, position = 'top', theme, children }) => {
  const [visible, setVisible] = useState(false);
  const [generatedVoiceText, setGeneratedVoiceText] = useState('');

  useEffect(() => {
    async function fetchVoiceText() {
      if (!voiceText) {
        const generated = await generateVoiceText(text);
        setGeneratedVoiceText(generated);
      }
    }
    fetchVoiceText();
  }, [text, voiceText]);

  useEffect(() => {
    if (visible) {
      const utterance = new SpeechSynthesisUtterance(voiceText || generatedVoiceText || text);
      speechSynthesis.speak(utterance);
    }
  }, [visible, voiceText, generatedVoiceText, text]);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={`voice-tooltip ${position}`}
      style={theme}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <span className="tooltip-text" style={{ visibility: visible ? 'visible' : 'hidden' }}>{text}</span>
    </div>
  );
};

VoiceTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  voiceText: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default VoiceTooltip;