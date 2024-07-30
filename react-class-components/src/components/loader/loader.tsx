import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}>
                <div className={styles.loaderInner} />
            </div>
        </div>
    );
}
