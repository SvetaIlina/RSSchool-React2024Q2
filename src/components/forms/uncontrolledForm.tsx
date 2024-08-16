import { FormEvent, useRef, useState } from 'react';
import { addFormData } from '../../service/formDataSlice';
import getBase64, { getPasswordStrengthLabel, handlePasswordChange } from '../../utils/utils';
import FormField from '../formFields/uncontrolledComponents/input';
import AutocompleteControl from '../formFields/uncontrolledComponents/autocomplete';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TFormData } from '../../types/types';
import './form.css';

export default function UncontrolledForm() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const genderRef = useRef<HTMLInputElement | null>(null);
    const termsRef = useRef<HTMLInputElement | null>(null);
    const uploadRef = useRef<HTMLInputElement | null>(null);
    const autoCompliteRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const genderRadios = genderRef.current?.parentNode?.querySelectorAll('input[name="gender"]');
        let selectedGender = '';

        if (genderRadios) {
            genderRadios.forEach((radio) => {
                if (radio instanceof HTMLInputElement) {
                    if (radio.checked) {
                        selectedGender = radio.value;
                    }
                }
            });
        }

        const uploadFile = uploadRef.current?.files?.[0];

        const data: TFormData = {
            name: nameRef.current?.value || '',
            age: ageRef.current?.value || '',
            email: emailRef.current?.value || '',
            gender: selectedGender,
            acceptTC: termsRef.current?.checked || false,
            country: autoCompliteRef.current?.value || '',
            file: uploadFile ? await getBase64(uploadFile) : '',
            password: passwordRef.current?.value || '',
            confirm: confirmPasswordRef.current?.value || '',
        };
        console.log(data);

        dispatch(addFormData(data));
        navigate('/');
    };

    return (
        <>
            <h1 className="form-title">Uncontrolled Form Component</h1>
            <form className="form" onSubmit={handleSubmit}>
                <FormField inputRef={nameRef} label="Name" id="name" type={'text'} placeholder={'Enter your name'} />
                <FormField inputRef={ageRef} label="Age" id="age" type={'number'} placeholder={'Enter your age'} />
                <FormField
                    inputRef={emailRef}
                    label="Email"
                    id="email"
                    type={'email'}
                    placeholder={'Enter your email'}
                />
                <FormField
                    inputRef={passwordRef}
                    label="Password"
                    id="password"
                    type={'password'}
                    placeholder={'Enter your password'}
                    onchange={(e) => handlePasswordChange(e, setPasswordStrength)}
                    classes={[getPasswordStrengthLabel(passwordStrength)]}
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
        </>
    );
}
