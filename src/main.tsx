import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = <StrictMode><App /></StrictMode>;
// prerendered pages (production build) are hydrated; `npm run dev` has an empty root
root.hasChildNodes() && !root.querySelector('noscript') ? hydrateRoot(root, app) : createRoot(root).render(app);
