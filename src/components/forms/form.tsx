import { FormEvent } from 'react';
import AutocompleteControl from '../formFields/autocomplete';
import FormField from '../formFields/input';
import './form.css';
import { useDispatch } from 'react-redux';
import { addFormData, TFormData } from '../../service/formDataSlice';

interface MyFormProps {
    nameRef?: React.MutableRefObject<HTMLInputElement | null>;
    ageRef?: React.MutableRefObject<HTMLInputElement | null>;
    emailRef?: React.MutableRefObject<HTMLInputElement | null>;
    passwordRef?: React.MutableRefObject<HTMLInputElement | null>;
    confirmPasswordRef?: React.MutableRefObject<HTMLInputElement | null>;
    genderRef?: React.MutableRefObject<HTMLInputElement | null>;
    termsRef?: React.MutableRefObject<HTMLInputElement | null>;
    uploadRef?: React.MutableRefObject<HTMLInputElement | null>;
    autoCompliteRef?: React.MutableRefObject<HTMLInputElement | null>;
    handleSubmit: () => Promise<TFormData>;
}

export default function MyForm({
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    genderRef,
    termsRef,
    uploadRef,
    autoCompliteRef,
    handleSubmit,
}: MyFormProps) {
    const dispatch = useDispatch();
    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await handleSubmit();
        dispatch(addFormData(data));
    };

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <FormField inputRef={nameRef} label="Name" id="name" type={'text'} placeholder={'Enter your name'} />
            <FormField inputRef={ageRef} label="Age" id="age" type={'number'} placeholder={'Enter your age'} />
            <FormField inputRef={emailRef} label="Email" id="email" type={'email'} placeholder={'Enter your email'} />
            <FormField
                inputRef={passwordRef}
                label="Password"
                id="password"
                type={'password'}
                placeholder={'Enter your password'}
            />
            <FormField
                inputRef={confirmPasswordRef}
                label="Confirm password"
                id="confirm"
                type={'password'}
                placeholder={'Confirm password'}
            />
            <FormField
                inputRef={genderRef}
                id="gender"
                type={'radio'}
                radioOptions={[
                    { value: 'male', text: 'Male', selected: true },
                    { value: 'female', text: 'Female' },
                    { value: 'other', text: 'Other' },
                ]}
            />
            <FormField inputRef={termsRef} label="I accept the Terms and Conditions" id="terms" type={'checkbox'} />
            <FormField inputRef={uploadRef} label="Upload picture" id="upload" type={'file'} />
            <AutocompleteControl inputRef={autoCompliteRef} />
            <button className="submit-btn" type="submit">
                Submit
            </button>
        </form>
    );
}
