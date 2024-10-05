// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './scss/style.scss';
import './fonts/HelveticaNeueCyr.css'
import './fonts/Montserrat.css'
import './fonts/IBMPlexSans.css'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  // </StrictMode>,
)
