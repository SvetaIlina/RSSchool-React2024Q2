import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/global.css';
import { Provider } from 'react-redux';
import { store } from '../src/utils/store';
import { ThemeProvider } from '../src/context/context';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}
