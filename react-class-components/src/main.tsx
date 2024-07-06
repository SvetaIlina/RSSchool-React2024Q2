import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';
import MyErrorBoundary from './components/errorBoundary/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MyErrorBoundary>
            <App />
        </MyErrorBoundary>
    </React.StrictMode>
);
