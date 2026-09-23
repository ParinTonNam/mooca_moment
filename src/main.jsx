import React from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/prompt/300.css';
import '@fontsource/prompt/400.css';
import '@fontsource/prompt/500.css';
import '@fontsource/prompt/600.css';
import App from './App';
import './styles.css';
import './needs.css';
import './rest.css';
import './reflection.css';
import './completion.css';
import './mobile.css';
import './progress.css';
import './desktop.css';
import './consult.css';

createRoot(document.getElementById('root')).render(<App/>);
