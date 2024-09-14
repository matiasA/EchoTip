import React from 'react';
import PropTypes from 'prop-types';

const VoiceTooltip = ({ text, voiceText, position = 'top', theme, children }) => {
  // Implementación del tooltip con texto a voz
  return (
    <div className={`voice-tooltip ${position}`} style={theme}>
      {children}
      <span className="tooltip-text">{text}</span>
      {/* Lógica de texto a voz */}
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