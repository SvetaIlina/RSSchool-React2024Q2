import { FormEvent, useRef, useState } from 'react';
import { addFormData } from '../../service/formDataSlice';
import getBase64, { getPasswordStrengthLabel, handlePasswordChange } from '../../utils/utils';
import FormField from '../formFields/uncontrolledComponents/input';
import AutocompleteControl from '../formFields/autocomplete';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TErrors, TFormData, UncontrolledFormData } from '../../types/types';
import './form.css';
import { schema } from '../../utils/yupShema';
import * as Yup from 'yup';

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
    const [errors, setErrors] = useState<TErrors>({});

    const getSelectedGender = () => {
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

        return selectedGender;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: UncontrolledFormData = {
            name: nameRef.current?.value || '',
            age: ageRef.current?.value || '',
            email: emailRef.current?.value || '',
            gender: getSelectedGender(),
            acceptTC: termsRef.current?.checked || false,
            country: autoCompliteRef.current?.value || '',
            file: uploadRef.current?.files?.[0],
            password: passwordRef.current?.value || '',
            confirm: confirmPasswordRef.current?.value || '',
        };
        try {
            await schema.validate(data, { abortEarly: false });
            const convertedFile = data.file ? await getBase64(data.file) : '';
            const formData: TFormData = {
                ...data,
                file: convertedFile,
            };
            dispatch(addFormData(formData));
            navigate('/');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: TErrors = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        if (!Object.keys(newErrors).includes(err.path)) {
                            newErrors[err.path] = [];
                        }
                        newErrors[err.path].push(err.message);
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <>
            <h1 className="form-title">Uncontrolled Form Component</h1>
            <form className="form" onSubmit={handleSubmit}>
                <FormField
                    inputRef={nameRef}
                    label="Name"
                    id="name"
                    type={'text'}
                    placeholder={'Enter your name'}
                    yupErrors={errors}
                />
                <FormField
                    inputRef={ageRef}
                    label="Age"
                    id="age"
                    type={'number'}
                    placeholder={'Enter your age'}
                    yupErrors={errors}
                />
                <FormField
                    inputRef={emailRef}
                    label="Email"
                    id="email"
                    type={'text'}
                    placeholder={'Enter your email'}
                    yupErrors={errors}
                />
                <FormField
                    inputRef={passwordRef}
                    label="Password"
                    id="password"
                    type={'password'}
                    placeholder={'Enter your password'}
                    onchange={(e) => handlePasswordChange(e, setPasswordStrength)}
                    classes={[getPasswordStrengthLabel(passwordStrength)]}
                    yupErrors={errors}
                />

                <FormField
                    inputRef={confirmPasswordRef}
                    label="Confirm password"
                    id="confirm"
                    type={'password'}
                    placeholder={'Confirm password'}
                    yupErrors={errors}
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
                    yupErrors={errors}
                />
                <FormField
                    inputRef={termsRef}
                    label="I accept the Terms and Conditions"
                    id="acceptTC"
                    type={'checkbox'}
                    yupErrors={errors}
                />
                <FormField inputRef={uploadRef} label="Upload picture" id="file" type={'file'} yupErrors={errors} />
                <AutocompleteControl id="country" inputRef={autoCompliteRef} yupErrors={errors} />
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}
