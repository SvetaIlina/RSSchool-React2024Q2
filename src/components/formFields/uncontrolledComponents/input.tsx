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
    yupErrors,
}: FormInputPropsRef) {
    const extraClasses = classes?.reduce((result, current) => result + ' ' + current, '') || '';
    const inputsErrors = yupErrors[id] || [];
    const errorsMessages = inputsErrors.map((error, index) => {
        return (
            <p key={index} className="error-message">
                {error}
            </p>
        );
    });

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
        <div className="form-field">
            <div className={`${type === 'radio' ? 'radio-field' : ''} input-wrapper ${extraClasses}`}>
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
            </div>
            <span className="message-wrapper">{inputsErrors.length ? errorsMessages : null}</span>
        </div>
    );
}
