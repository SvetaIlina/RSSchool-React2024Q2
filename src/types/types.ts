import { ChangeEvent } from 'react';
import { MultipleFieldErrors, Message, Ref, UseFormRegister, Path, FieldValues } from 'react-hook-form';

export type TErrors = { [key: string]: string[] };

type Option = {
    value: string;
    text: string;
    selected?: boolean | undefined;
};

type FieldError = {
    type: string;
    ref?: Ref;
    types?: MultipleFieldErrors;
    message?: Message;
};

export interface TFormData {
    name: string;
    age: string;
    email: string;
    gender?: string;
    acceptTC: boolean;
    country: string;
    file: string;
    password: string;
    confirm: string;
}

export interface HookFormData extends Omit<TFormData, 'file' | 'age' | 'date'> {
    file: FileList;
    age: number;
}
export interface UncontrolledFormData extends Omit<TFormData, 'file' | 'date'> {
    file: File | undefined;
}

export interface FormInputProps {
    label?: string;
    id: string;
    type?: string;
    placeholder?: string;
    radioOptions?: Option[];
    onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
    classes?: string[];
}

export interface FormInputPropsRef extends FormInputProps {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    yupErrors: TErrors;
}
export interface FormInputPropsRHF<T extends FieldValues> extends FormInputProps {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError;
}
