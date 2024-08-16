import { useForm, SubmitHandler } from 'react-hook-form';
import { addFormData } from '../../service/formDataSlice';
import './form.css';
import FormFieldRHF from '../formFields/hookFormComponents/inputRHF';
import { useDispatch } from 'react-redux';
import getBase64, { getPasswordStrengthLabel, handlePasswordChange } from '../../utils/utils';
import { HookFormData, TFormData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import AutocompleteControlHookForm from '../formFields/hookFormComponents/autocompleteInputRHF';
import { useState } from 'react';

export default function HookFormComponent() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<HookFormData>({ mode: 'all' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState(0);

    const submit: SubmitHandler<HookFormData> = async (data: HookFormData) => {
        const convertedFile = data.file[0] ? await getBase64(data.file[0]) : '';
        const formData: TFormData = {
            ...data,
            file: convertedFile,
        };
        console.log(formData);

        dispatch(addFormData(formData));
        navigate('/');
    };

    return (
        <>
            <h1 className="form-title">React Hook Form Component</h1>

            <form className="form" onSubmit={handleSubmit(submit)}>
                <FormFieldRHF
                    label="Name"
                    id="name"
                    type={'text'}
                    placeholder={'Enter your name'}
                    register={register}
                    name="name"
                    errors={errors.name}
                />
                <FormFieldRHF
                    label="Age"
                    id="age"
                    type={'number'}
                    placeholder={'Enter your age'}
                    register={register}
                    name="age"
                    errors={errors.age}
                />
                <FormFieldRHF
                    label="Email"
                    id="email"
                    type={'email'}
                    placeholder={'Enter your email'}
                    register={register}
                    name="email"
                    errors={errors.email}
                />
                <FormFieldRHF
                    label="Password"
                    id="password"
                    type={'password'}
                    placeholder={'Enter your password'}
                    register={register}
                    name="password"
                    errors={errors.password}
                    onchange={(e) => handlePasswordChange(e, setPasswordStrength)}
                    classes={[getPasswordStrengthLabel(passwordStrength)]}
                />
                <FormFieldRHF
                    label="Confirm password"
                    id="confirm"
                    type={'password'}
                    placeholder={'Confirm password'}
                    register={register}
                    name="confirm"
                    errors={errors.confirm}
                />
                <FormFieldRHF
                    id="gender"
                    type={'radio'}
                    radioOptions={[
                        { value: 'male', text: 'Male', selected: true },
                        { value: 'female', text: 'Female' },
                        { value: 'other', text: 'Other' },
                    ]}
                    register={register}
                    name="gender"
                    errors={errors.gender}
                />
                <FormFieldRHF
                    label="I accept the Terms and Conditions"
                    id="terms"
                    type={'checkbox'}
                    register={register}
                    name="acceptTC"
                    errors={errors.acceptTC}
                />
                <FormFieldRHF
                    label="Upload picture"
                    id="upload"
                    type={'file'}
                    register={register}
                    name="file"
                    errors={errors.file}
                />
                <AutocompleteControlHookForm
                    register={register}
                    name="country"
                    errors={errors.country}
                    setValue={setValue}
                />
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}
