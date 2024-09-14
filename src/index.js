import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePage from './components/ExamplePage';

ReactDOM.render(
  <React.StrictMode>
    <ExamplePage />
  </React.StrictMode>,
  document.getElementById('root')
);

export { default as VoiceTooltip } from './components/VoiceTooltip';