import React, { Component } from 'react';
import { Result } from '../../../types/type';
import './card.css';

class Card extends Component<Result> {
    render() {
        return (
            <div className="result-item">
                <h3 className="item-title">{this.props.name}</h3>
                <p className="item-description">{this.props.description}</p>
            </div>
        );
    }
}

export default Card;
