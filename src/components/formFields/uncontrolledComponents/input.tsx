import { FormInputPropsRef } from '../../../types/types';
import '../input.css';

export default function FormField({
    label,
    id,
    type,
    placeholder,
    radioOptions,
    classes,
    inputRef,
    onchange,
}: FormInputPropsRef) {
    const extraClasses = classes?.reduce((result, current) => result + ' ' + current, '') || '';
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
        <div className={`${type === 'radio' ? 'radio-field' : ''} form-field ${extraClasses}`}>
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
                    onChange={onchange ? onchange : undefined}
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
            <span className="error-message"> </span>
        </div>
    );
}
