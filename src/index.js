import React from 'react';
import ReactDOM from 'react-dom'; // Usa ReactDOM en lugar de ReactDOM.createRoot
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar BrowserRouter
import './index.css';
import App from './components/App'; // Asegúrate de que la ruta a App sea correcta
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Aquí envolvemos App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // El segundo argumento es el contenedor donde se renderiza la app
);

reportWebVitals();