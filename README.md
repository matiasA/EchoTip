# 🎙️ React VoiceTooltip

React VoiceTooltip es un componente de React que crea tooltips interactivos con capacidad de texto a voz, mejorando la accesibilidad y la experiencia del usuario.

## 🌟 Características

- Tooltips personalizables con diseño adaptable
- Generación automática de audio al mostrar el tooltip
- Integración con OpenAI para la síntesis de voz de alta calidad
- Fácil integración con proyectos React
- Opciones de personalización para voz y apariencia
- Totalmente accesible y compatible con lectores de pantalla

## 🚀 Instalación


npm install react-voice-tooltip openai



## 🛠️ Configuración

1. Asegúrate de tener una clave de API de OpenAI.
2. Crea un archivo `.env` en la raíz de tu proyecto y añade tu clave de API:


REACT_APP_OPENAI_API_KEY=tu_clave_api_aqui



## 📖 Uso


jsx
import React from 'react';
import VoiceTooltip from 'react-voice-tooltip';
function App() {
return (
<div>
<VoiceTooltip text="Este es un botón importante" voiceText="Este botón realiza una acción crítica">
<button>Botón Importante</button>
</VoiceTooltip>
</div>
);
}
export default App;



## 📚 Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `text` | string | Texto a mostrar en el tooltip (requerido) |
| `voiceText` | string | Texto a convertir en voz (opcional, si es diferente de `text`) |
| `position` | string | Posición del tooltip ('top', 'bottom', 'left', 'right') |
| `children` | node | Elemento al que se aplicará el tooltip (requerido) |
| `onError` | function | Función a llamar en caso de error |

## 🧪 Pruebas

Para ejecutar las pruebas:

npm test


## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.

## 📄 Licencia

MIT © Cristian Matias Aracena