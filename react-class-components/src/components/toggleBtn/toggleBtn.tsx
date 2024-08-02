import React from 'react';
import styles from './toggleBtn.module.css';
import useTheme from '../../hooks/useTheme';

export default function ToggleBtn() {
    const { isDark, toggleTheme } = useTheme();

    const handleToggleTheme = () => {
        toggleTheme();
        document.body.classList.toggle('isDark');
    };

    return (
        <button
            className={`${styles.toggleThemeBtn} ${isDark ? styles.toggleThemeBtnDark : ''}`}
            onClick={handleToggleTheme}
        >
            Toggle Theme
        </button>
    );
}
