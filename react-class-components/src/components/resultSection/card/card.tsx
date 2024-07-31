import { SwapiPerson } from '../../../types/type';
import styles from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedItemsDetails, toggleItemSelection } from '../../../utils/selectedItemlSlice';
import SelectCheckBox from '../checkBox/checkBox';
import useTheme from '../../../hooks/useTheme';
import { useRouter } from 'next/router';

interface CardProps {
    character: SwapiPerson;
}

export default function Card({ character }: CardProps) {
    const dispatch = useDispatch();
    const selectedItems = useSelector(getSelectedItemsDetails);
    const { isDark } = useTheme();
    const router = useRouter();

    const handleShowDetails = (name: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, details: name },
        });
    };

    const handleCheckboxChange = () => {
        dispatch(toggleItemSelection(character));
    };

    const isSelected = selectedItems.some((item) => item.name === character.name);

    return (
        <div className={`${styles.resultItem} ${isDark ? styles.resultItemDark : ''}`}>
            <h3 className={styles.itemTitle}>{character.name}</h3>
            <button
                className={`${styles.detailsBtn} ${isDark ? styles.detailsBtnDark : ''}`}
                onClick={() => handleShowDetails(character.name)}
            >
                Show Details
            </button>
            <SelectCheckBox isSelected={isSelected} handleChange={handleCheckboxChange} />
        </div>
    );
}
