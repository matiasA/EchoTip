# React EchoTip

React EchoTip es una librería de React que permite crear tooltips interactivos con capacidad de texto a voz. Mejora la accesibilidad y la experiencia del usuario al proporcionar información tanto visual como auditiva.

## 🌟 Características

- 🎨 Tooltips estándar con diseño personalizable
- 🔊 Funcionalidad de texto a voz integrada
- 🔌 Fácil integración con proyectos React existentes
- ⚙️ Opciones de personalización para voz y apariencia
- ♿ Totalmente accesible y compatible con lectores de pantalla

## 🚀 Instalación

Para instalar React EchoTip en tu proyecto, ejecuta uno de los siguientes comandos:

```bash
npm install react-echotip

## 📘 Uso básico

Aquí tienes un ejemplo simple de cómo usar React EchoTip en tu aplicación:

```jsx
import React from 'react';
import { EchoTip } from 'react-echotip';
function App() {
  return (
    <div>
      <EchoTip
        text="Este es un tooltip con voz"
        voiceText="Este es el texto que se leerá en voz alta"
      >
        <button>Hover sobre mí</button>
      </EchoTip>
    </div>
  );
}
export default App;

## 📚 API

### `<EchoTip>`

#### Propiedades principales:

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `text` | string | Sí | El texto que se mostrará en el tooltip. |
| `voiceText` | string | No | El texto que se leerá en voz alta. Si no se proporciona, se usará el valor de `text`. |
| `position` | string | No | La posición del tooltip ('top', 'bottom', 'left', 'right'). Por defecto es 'top'. |
| `theme` | object | No | Un objeto para personalizar el estilo del tooltip. |

## 🎨 Personalización

Puedes personalizar la apariencia y el comportamiento de los tooltips. Consulta nuestra [documentación detallada](link-a-documentacion) para más información sobre las opciones de personalización.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [guía de contribución](link-a-guia-contribucion) para más detalles sobre cómo puedes contribuir al proyecto.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](link-a-licencia) para más detalles.

## 💬 Soporte

Si tienes alguna pregunta o problema, por favor abre un [issue](link-a-issues) en nuestro repositorio de GitHub.

---
