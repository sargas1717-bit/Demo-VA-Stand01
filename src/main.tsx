import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <App />
);

// DEMO: Service Worker deshabilitado intencionalmente para evitar que el caché
// interfiera con la carga de modelos MediaPipe (.wasm / .data) durante la demo.
// Si había un SW registrado previamente, lo limpiamos para garantizar requests frescos.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const reg of registrations) {
      reg.unregister();
      console.log("[Demo] Service Worker desregistrado para evitar caché de modelos.");
    }
  });
}

