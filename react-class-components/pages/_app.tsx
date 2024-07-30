import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/global.css';
import { Provider } from 'react-redux';
import { wrapper } from '../src/utils/store';
import { ThemeProvider } from '../src/context/context';

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={wrapper.useWrappedStore(pageProps).store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default wrapper.withRedux(App);
