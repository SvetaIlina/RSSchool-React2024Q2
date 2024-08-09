import { NavLink } from '@remix-run/react';
import './errorMessage.css';

interface ErrorMessageProps {
    text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
    return (
        <div className="error-container">
            <div className="errorMsg">{text}</div>
            <NavLink className="backLink" to={'/'}>
                Back
            </NavLink>
        </div>
    );
}
