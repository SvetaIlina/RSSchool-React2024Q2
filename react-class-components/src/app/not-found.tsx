import Link from 'next/link';
import React from 'react';

export default function NotFoundPage(): JSX.Element {
    return (
        <div className="not-found">
            <h1 className="notFound-title">Sorry, we can’t find this page</h1>
            <Link className="notFound-button" href="/">
                back to homepage
            </Link>
        </div>
    );
}
