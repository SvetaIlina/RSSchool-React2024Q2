import { ChangeEvent } from 'react';

const getBase64 = (file: File): Promise<string> => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = (error) => {
            rej(error);
        };
        reader.readAsDataURL(file);
    });
};

export default getBase64;

export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function calculatePasswordStrength(password: string): number {
    let strength = 0;

    if (/[0-9]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
}

export function getPasswordStrengthLabel(strength: number): string {
    switch (strength) {
        case 1:
        case 2:
            return 'weak';
        case 3:
            return 'medium';
        case 4:
            return 'strong';
        default:
            return '';
    }
}

export const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<number>>
) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    setFunction(strength);
};
