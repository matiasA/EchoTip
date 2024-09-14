React EchoTip
React EchoTip es una librería de React que permite crear tooltips interactivos con capacidad de texto a voz. Mejora la accesibilidad y la experiencia del usuario al proporcionar información tanto visual como auditiva.
Características

Tooltips estándar con diseño personalizable
Funcionalidad de texto a voz integrada
Fácil integración con proyectos React existentes
Opciones de personalización para voz y apariencia
Totalmente accesible y compatible con lectores de pantalla

Instalación
Para instalar React Voice Tooltip en tu proyecto, ejecuta el siguiente comando:
bashCopynpm install react-voice-tooltip
o si usas yarn:
bashCopyyarn add react-voice-tooltip
Uso básico
Aquí tienes un ejemplo simple de cómo usar React Voice Tooltip en tu aplicación:
jsxCopyimport React from 'react';
import { VoiceTooltip } from 'react-voice-tooltip';

function App() {
  return (
    <div>
      <VoiceTooltip 
        text="Este es un tooltip con voz"
        voiceText="Este es el texto que se leerá en voz alta"
      >
        <button>Hover sobre mí</button>
      </VoiceTooltip>
    </div>
  );
}

export default App;
API
<VoiceTooltip>
Propiedades principales:

text (string, requerido): El texto que se mostrará en el tooltip.
voiceText (string, opcional): El texto que se leerá en voz alta. Si no se proporciona, se usará el valor de text.
position (string, opcional): La posición del tooltip ('top', 'bottom', 'left', 'right'). Por defecto es 'top'.
theme (object, opcional): Un objeto para personalizar el estilo del tooltip.

Personalización
Puedes personalizar la apariencia y el comportamiento de los tooltips. Consulta nuestra documentación detallada para más información sobre las opciones de personalización.
Contribución
¡Las contribuciones son bienvenidas! Por favor, lee nuestra guía de contribución para más detalles sobre cómo puedes contribuir al proyecto.
Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
Soporte
Si tienes alguna pregunta o problema, por favor abre un issue en nuestro repositorio de GitHub.

Esperamos que disfrutes usando React Voice Tooltip. ¡Feliz coding!
