import { useRef } from 'react';
import MyForm from './form';
import { TFormData } from '../../service/formDataSlice';
import getBase64 from '../../utils/utils';

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

    const handleSubmit = async () => {
        const genderRadios = genderRef?.current?.parentNode?.querySelectorAll('input[name="gender"]');
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

        const uploadFile = uploadRef?.current?.files?.[0];

        const data: TFormData = {
            name: nameRef?.current?.value || '',
            age: ageRef?.current?.value || '',
            email: emailRef?.current?.value || '',
            gender: selectedGender,
            acceptTC: termsRef?.current?.checked || false,
            country: autoCompliteRef?.current?.value || '',
            file: uploadFile ? await getBase64(uploadFile) : '',
        };

        return data;
    };

    return (
        <>
            <h1 className="form-title">Uncontrolled Component</h1>
            <MyForm
                nameRef={nameRef}
                ageRef={ageRef}
                emailRef={emailRef}
                passwordRef={passwordRef}
                confirmPasswordRef={confirmPasswordRef}
                genderRef={genderRef}
                termsRef={termsRef}
                uploadRef={uploadRef}
                autoCompliteRef={autoCompliteRef}
                handleSubmit={handleSubmit}
            />
        </>
    );
}
