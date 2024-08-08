import {
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    json,
    isRouteErrorResponse,
    useRouteError,
} from '@remix-run/react';
import { Provider } from 'react-redux';
import { store } from '../src/utils/store';
import MyErrorBoundary from '../src/components/errorBoundary/errorBoundary';
import { ThemeProvider } from '../src/context/context';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import appStylesHref from './app.css?url';
import fetchData from '../src/utils/swapi';
import MainPage from '../src/components/main/mainPage';
import NotFoundPage from '../src/components/404/404';
import { Page } from '../src/types/enums';
import ErrorMessage from '../src/components/errorMessage/errorMessage';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: appStylesHref }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const term = url.searchParams.get('searchTerm') || '';
    const page = url.searchParams.get('page') || '1';
    const searchResult = await fetchData(term, page);
    if (!searchResult) {
        throw new Response('Not Found', { status: 404 });
    }
    return json({ searchResult });
};

export default function App() {
    const { searchResult } = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <div id="root">
                    <Provider store={store}>
                        <MyErrorBoundary>
                            <ThemeProvider>
                                <MainPage
                                    searchResult={searchResult}
                                    totalPages={Math.ceil(searchResult.count / Page.TOTAL)}
                                />
                            </ThemeProvider>
                        </MyErrorBoundary>
                    </Provider>
                    <ScrollRestoration />
                    <Scripts />
                </div>
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html>
            <head>
                <title>Oops!</title>
                <Meta />
                <Links />
            </head>
            <body>
                {isRouteErrorResponse(error) ? (
                    <NotFoundPage />
                ) : error instanceof Error ? (
                    <ErrorMessage text={error.message} />
                ) : (
                    <ErrorMessage text={'Unknown Error'} />
                )}

                <Scripts />
            </body>
        </html>
    );
}
