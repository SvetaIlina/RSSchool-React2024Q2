import { SwapiPerson } from '../../../types/type';
import styles from './detailCard.module.css';
import React from 'react';
interface CardProps {
    character: SwapiPerson;
}

export default function DetailCard({ character }: CardProps) {
    return (
        <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>{character.name}</h3>
            <p
                className={styles.detailDescription}
            >{`${character.name} is ${character.height} cm tall, weighs ${character.mass} kg, has ${character.hair_color} hair, ${character.skin_color} skin, and ${character.eye_color} eyes.`}</p>
        </div>
    );
}
