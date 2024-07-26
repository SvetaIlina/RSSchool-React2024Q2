import { useNavigate } from 'react-router-dom';
import { SwapiPerson } from '../../../types/type';
import './card.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedItemsDetails, toggleItemSelection } from '../../../utils/selectedItemlSlice';
import SelectCheckBox from '../checkBox/checkBox';

interface CardProps {
    character: SwapiPerson;
}

export default function Card({ character }: CardProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedItems = useSelector(getSelectedItemsDetails);

    const handleShowDetails = (name: string) => {
        navigate(`details/${name}`, { replace: true });
    };

    const handleCheckboxChange = () => {
        dispatch(toggleItemSelection(character));
    };

    const isSelected = selectedItems.some((item) => item.name === character.name);

    return (
        <div className="result-item">
            <h3 className="item-title">{character.name}</h3>
            <button className="details-btn" onClick={() => handleShowDetails(character.name)}>
                Show Details
            </button>
            <SelectCheckBox isSelected={isSelected} handleChange={handleCheckboxChange} />
        </div>
    );
}
