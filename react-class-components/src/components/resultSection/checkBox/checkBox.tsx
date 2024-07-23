import './checkBox.css';

interface SelectCheckBoxProps {
    isSelected: boolean;
    handleChange: () => void;
}

export default function SelectCheckBox({ isSelected, handleChange }: SelectCheckBoxProps) {
    return (
        <div className="select-field">
            <label className="item-checkbox-label">Add to favorites</label>
            <input type="checkbox" checked={isSelected} onChange={handleChange} className="item-checkbox" />
        </div>
    );
}
