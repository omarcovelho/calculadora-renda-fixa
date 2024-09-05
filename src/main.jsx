import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';

ReactGA.initialize('G-9F3XEBGWYL');

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
