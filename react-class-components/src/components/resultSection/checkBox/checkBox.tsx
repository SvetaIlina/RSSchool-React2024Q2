import styles from './checkBox.module.css';
import React from 'react';
interface SelectCheckBoxProps {
    isSelected: boolean;
    handleChange: () => void;
}

export default function SelectCheckBox({ isSelected, handleChange }: SelectCheckBoxProps) {
    return (
        <div className={styles.selectField}>
            <label id="favorites" className={styles.itemCheckboxLabel}>
                Add to favorites
            </label>
            <input
                aria-labelledby="favorites"
                type="checkbox"
                checked={isSelected}
                onChange={handleChange}
                className={styles.itemCheckbox}
            />
        </div>
    );
}
