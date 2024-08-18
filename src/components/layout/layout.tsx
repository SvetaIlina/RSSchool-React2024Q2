import { Outlet } from 'react-router-dom';
import './layout.css';
import Footer from '../footer/footer';

export default function Layout() {
    return (
        <div className="wrapper">
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
