import { SwapiPerson } from '../../../types/type';
import './card.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedItemsDetails, toggleItemSelection } from '../../../utils/selectedItemlSlice';
import SelectCheckBox from '../checkBox/checkBox';
import { NavLink, useLocation } from '@remix-run/react';

interface CardProps {
    character: SwapiPerson;
}

export default function Card({ character }: CardProps) {
    const dispatch = useDispatch();
    const selectedItems = useSelector(getSelectedItemsDetails);
    const location = useLocation();
    const handleCheckboxChange = () => {
        dispatch(toggleItemSelection(character));
    };
    const newUrl = `/details/${character.name}${location.search}`;

    const isSelected = selectedItems.some((item) => item.name === character.name);

    return (
        <div className="result-item">
            <h3 className="item-title">{character.name}</h3>
            <NavLink className="details-btn" to={newUrl}>
                Show Details
            </NavLink>
            <SelectCheckBox isSelected={isSelected} handleChange={handleCheckboxChange} />
        </div>
    );
}
