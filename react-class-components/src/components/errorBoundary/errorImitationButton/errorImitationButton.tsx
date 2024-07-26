import './errorImitationButton.css';

interface ErrorImitationBtnProps {
    onclick: () => void;
}

export default function ErrorImitationBtn({ onclick }: ErrorImitationBtnProps) {
    return (
        <button className="error-btn" onClick={onclick}>
            Generate Error
        </button>
    );
}
