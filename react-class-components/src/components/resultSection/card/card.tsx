import React, { Component } from 'react';
import { SwapiPerson } from '../../../types/type';
import './card.css';

interface CardProps {
    character: SwapiPerson;
}

class Card extends Component<CardProps> {
    render() {
        const { character } = this.props;
        return (
            <div className="result-item">
                <h3 className="item-title">{character.name}</h3>
                <p className="item-description">{`${character.name} is ${character.height} cm tall, weighs ${character.mass} kg, has ${character.hair_color} hair, ${character.skin_color} skin, and ${character.eye_color} eyes.`}</p>
            </div>
        );
    }
}

export default Card;
