import { SwapiPerson } from '../../../types/type';
import './card.css';

interface CardProps {
    character: SwapiPerson;
}

export default function Card({ character }: CardProps) {
    return (
        <div className="result-item">
            <h3 className="item-title">{character.name}</h3>
            <p className="item-description">{`${character.name} is ${character.height} cm tall, weighs ${character.mass} kg, has ${character.hair_color} hair, ${character.skin_color} skin, and ${character.eye_color} eyes.`}</p>
        </div>
    );
}
