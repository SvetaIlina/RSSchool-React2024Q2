import { Route, Routes } from 'react-router-dom';
import './app.css';
import MainPage from '../../pages/main/mainPage';
import NotFoundPage from '../../pages/notFound/notFoundPage';
import DetailPage from '../../pages/detailPage/detailPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route path="/details/:name" element={<DetailPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
