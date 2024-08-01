import { useSelector } from 'react-redux';
import { clearSelectedItems, getNumberOfSelectedItems, getSelectedItemsDetails } from '../../utils/selectedItemlSlice';
import styles from './flyout.module.css';
import { useDispatch } from 'react-redux';
import DownloadLink from './downloadLink/downLoadLink';
import useTheme from '../../hooks/useTheme';
import React from 'react';

export default function Flyout() {
    const dispatch = useDispatch();
    const selectedItems = useSelector(getSelectedItemsDetails);
    const numberOfItems = useSelector(getNumberOfSelectedItems);
    const { isDark } = useTheme();
    if (!numberOfItems) {
        return null;
    }

    const handleClearAll = () => dispatch(clearSelectedItems());

    return (
        <div className={`${styles.flyout} ${isDark ? styles.flyoutDark : ''}`}>
            <p className={styles.flyoutDescription}>
                You have {numberOfItems} favorite character{numberOfItems > 1 ? 's' : ''}
            </p>
            <div className={styles.btnContainer}>
                <button onClick={handleClearAll} className={styles.flyoutBtnUnselect}>
                    Unselect all
                </button>
                <button className={styles.flyoutBtnDownload}>
                    <DownloadLink items={selectedItems} />
                </button>
            </div>
        </div>
    );
}
