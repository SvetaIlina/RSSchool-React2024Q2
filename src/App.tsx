import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import UncontrolledForm from './pages/uncontrolledFormPage';
import ReactForm from './pages/reactHookFormPage';
import Layout from './components/layout/layout';
import NotFoundPage from './pages/notFoundPage';

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="uncontrolled" element={<UncontrolledForm />} />
                    <Route path="reactHookForm" element={<ReactForm />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
