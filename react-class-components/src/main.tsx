import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';
import MyErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MyErrorBoundary>
                <App />
            </MyErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);
