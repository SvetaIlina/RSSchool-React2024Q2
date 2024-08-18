import { FieldValues } from 'react-hook-form';
import { FormInputPropsRHF } from '../../../types/types';
import '../input.css';

export default function FormFieldRHF<T extends FieldValues>({
    label,
    id,
    type,
    placeholder,
    onchange,
    classes,
    radioOptions,
    name,
    register,
    errors,
}: FormInputPropsRHF<T>) {
    const extraClasses = classes?.reduce((result, current) => result + ' ' + current, '') || '';
    const options = radioOptions?.map((option) => {
        return (
            <div key={option.value} className="form-radio-option">
                <input
                    type="radio"
                    id={`${id}-${option.value}`}
                    defaultChecked={option.selected}
                    value={option.value}
                    {...register(name)}
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
                        {...register(name, {
                            ...(onchange ? { onChange: (e) => onchange(e) } : {}),
                        })}
                        type={type}
                        className="form-input"
                        placeholder={placeholder}
                        spellCheck="false"
                        id={id}
                    />
                )}

                {type === 'radio' && (
                    <>
                        <legend>Check your gender</legend>
                        <div className="form-radio-group">{options}</div>
                    </>
                )}
            </div>

            <span className="message-wrapper">
                <p className="error-message">{!errors ? '' : !errors.ref ? '' : errors.message}</p>
            </span>
        </div>
    );
}
