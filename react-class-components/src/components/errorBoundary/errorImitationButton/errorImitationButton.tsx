import styles from './errorImitationButton.module.css';

interface ErrorImitationBtnProps {
    onclick: () => void;
}

export default function ErrorImitationBtn({ onclick }: ErrorImitationBtnProps) {
    return (
        <button className={styles.errorBtn} onClick={onclick}>
            Generate Error
        </button>
    );
}
