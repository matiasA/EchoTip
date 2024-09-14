// Importamos React, que es necesario para crear componentes
import React from 'react';

// Importamos ReactDOM desde 'react-dom/client', que nos permite renderizar componentes React en el DOM
import ReactDOM from 'react-dom/client';

// Importamos nuestro componente principal App
import App from './App';

// Creamos una raíz de React. Esto es parte de la nueva API de React 18
// Buscamos el elemento con id 'root' en nuestro HTML y lo usamos como punto de entrada
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos nuestra aplicación
root.render(
  // Envolvemos nuestra App en React.StrictMode
  // StrictMode es una herramienta para destacar problemas potenciales en la aplicación
  // No renderiza ninguna UI visible, sino que activa verificaciones y advertencias adicionales para sus descendientes
  <React.StrictMode>
    {/* Renderizamos nuestro componente App */}
    <App />
  </React.StrictMode>
);
