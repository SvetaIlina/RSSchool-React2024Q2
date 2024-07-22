import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';
import MyErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { store } from './utils/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MyErrorBoundary>
                    <App />
                </MyErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
