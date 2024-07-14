import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.css';
import MainPage from '../../pages/main/mainPage';
import React from 'react';
import NotFoundPage from '../../pages/notFound/notFoundPage';
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export default function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
