import * as Yup from 'yup';
import countries from '../service/countryData';

export const schema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Z]/, { message: 'Name must start with an uppercase letter', excludeEmptyString: true }),
    age: Yup.number()
        .typeError('Age must be a number')
        .transform((value) => {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? undefined : parsed;
        })
        .positive('Age must be positive')
        .integer('Age must be an integer')
        .required('Age is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
        .matches(/(?=.*[0-9])/, { message: 'Password must contain a number', excludeEmptyString: true })
        .matches(/(?=.*[a-z])/, { message: 'Password must contain a lowercase letter', excludeEmptyString: true })
        .matches(/(?=.*[A-Z])/, { message: 'Password must contain an uppercase letter', excludeEmptyString: true })
        .matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain a special character', excludeEmptyString: true })
        .required('Password is required'),
    confirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),

    acceptTC: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('Terms and conditions acceptance is required'),
    file: Yup.mixed<FileList>()
        .test('fileList length', 'Please, choose a file', (value) => {
            if (value instanceof File) {
                return true;
            } else {
                return Boolean(value?.length);
            }
        })
        .test('fileSize', 'File is too large', (value) => {
            if (!value) {
                return false;
            }

            if (value instanceof File) {
                return value.size <= 2 * 1024 * 1024;
            }

            if (value instanceof FileList) {
                return value[0]?.size <= 2 * 1024 * 1024;
            }
        })
        .test('fileType', 'Unsupported file format', (value) => {
            const validTypes = ['image/png', 'image/jpeg'];
            if (!value) {
                return false;
            }
            if (value instanceof File) {
                return validTypes.includes(value.type);
            }

            if (value instanceof FileList) {
                return validTypes.includes(value[0]?.type);
            }
        })
        .required('Please, choose a file'),

    country: Yup.mixed<string>()
        .required('Country is required')
        .test('countryName', 'Please select a country from the list', (value) => {
            return countries.includes(value);
        }),
});
