import{StrictMode}from'react';
import{createRoot}from'react-dom/client';
import App from'./App';
import'./styles/tokens.css';
import'./styles/global.css';
import'./styles/shell.css';
import'./styles/sections.css';
import'./styles/refinements.css';
import'./styles/capabilities-trail.css';
import'./styles/mobile-fixes.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
