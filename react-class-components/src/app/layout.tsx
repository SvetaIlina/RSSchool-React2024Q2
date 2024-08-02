import { Metadata } from 'next';
import '../../styles/global.css';

export const metadata: Metadata = {
    title: 'SWAPI',
    description: 'Welcome to Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div id="__next">{children}</div>
            </body>
        </html>
    );
}
