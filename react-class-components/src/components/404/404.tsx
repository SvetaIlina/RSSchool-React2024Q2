import { NavLink } from '@remix-run/react';
import './404.css';

export default function NotFoundPage(): JSX.Element {
    return (
        <div className="not-found">
            <h1 className="notFound-title">Sorry, we can’t find this page</h1>
            <NavLink className="notFound-button" to="/">
                back to homepage
            </NavLink>
        </div>
    );
}
