import { SwapiPerson } from '../../../types/type';
import './detailCard.css';
interface CardProps {
    character: SwapiPerson;
}

export default function DetailCard({ character }: CardProps) {
    return (
        <div className="detail-item">
            <h3 className="detail-title item-title">{character.name}</h3>
            <p className="detail-description">{`${character.name} is ${character.height} cm tall, weighs ${character.mass} kg, has ${character.hair_color} hair, ${character.skin_color} skin, and ${character.eye_color} eyes.`}</p>
        </div>
    );
}
