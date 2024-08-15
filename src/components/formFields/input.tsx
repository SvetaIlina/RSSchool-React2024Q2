import './input.css';

type Option = {
    value: string;
    text: string;
    selected?: boolean | undefined;
};

interface FormInputProps {
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    radioOptions?: Option[];
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

export default function FormField({ label, id, type, placeholder, radioOptions, inputRef }: FormInputProps) {
    const options = radioOptions?.map((option) => {
        return (
            <div key={option.value} className="form-radio-option">
                <input
                    type="radio"
                    id={`${id}-${option.value}`}
                    name={id}
                    defaultChecked={option.selected}
                    value={option.value}
                />
                <label htmlFor={`${id}-${option.value}`}>{option.text}</label>
            </div>
        );
    });
    return (
        <div className={`${type === 'radio' ? 'radio-field' : ''} form-field`}>
            {label && (
                <label className="form-label" htmlFor={id}>
                    {label}
                </label>
            )}
            {type !== 'radio' && (
                <input
                    ref={inputRef}
                    type={type}
                    className="form-input"
                    placeholder={placeholder}
                    spellCheck="false"
                    id={id}
                    name={id}
                />
            )}

            {type === 'radio' && (
                <>
                    <legend>Check your gender</legend>
                    <div className="form-radio-group" ref={inputRef}>
                        {options}
                    </div>
                </>
            )}
            {type === 'password' && <div className="password-strength"></div>}
            <span className="error-message"> </span>
        </div>
    );
}
