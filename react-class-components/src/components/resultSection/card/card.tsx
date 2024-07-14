import { useNavigate } from 'react-router-dom';
import { SwapiPerson } from '../../../types/type';
import './card.css';

interface CardProps {
    character: SwapiPerson;
}

export default function Card({ character }: CardProps) {
    const navigate = useNavigate();
    const handleShowDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => {
        e.stopPropagation();
        navigate(`/details/${name}`, { replace: true });
    };
    return (
        <div className="result-item" onClick={(e) => handleShowDetails(e, character.name)}>
            <h3 className="item-title">{character.name}</h3>
        </div>
    );
}
