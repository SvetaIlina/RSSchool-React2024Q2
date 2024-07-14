import { Link } from 'react-router-dom';
import './notFounPage.css';

export default function NotFoundPage(): JSX.Element {
    return (
        <div className="not-found">
            <h1 className="notFound-title">Sorry, we can’t find this page</h1>
            <Link className="notFound-button" to="/">
                back to homepage
            </Link>
        </div>
    );
}
