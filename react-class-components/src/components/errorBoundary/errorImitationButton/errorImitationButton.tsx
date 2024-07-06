import { Component } from 'react';
import './errorImitationButton.css';

interface ErrorImitationBtnProps {
    onclick: () => void;
}

export default class ErrorImitationBtn extends Component<ErrorImitationBtnProps> {
    render() {
        return (
            <button className="error-btn" onClick={this.props.onclick}>
                Generate Error
            </button>
        );
    }
}
