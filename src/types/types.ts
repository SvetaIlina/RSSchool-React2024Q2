import { ChangeEvent } from 'react';
import { MultipleFieldErrors, Message, Ref, UseFormRegister, Path, FieldValues } from 'react-hook-form';

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
    gender: string;
    acceptTC: boolean;
    country: string;
    file: string | ArrayBuffer | null;
    password: string;
    confirm: string;
}

export interface HookFormData extends Omit<TFormData, 'file'> {
    file: FileList;
    password: string;
    confirm: string;
}

export interface FormInputProps {
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    radioOptions?: Option[];
    onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
    classes?: string[];
}

export interface FormInputPropsRef extends FormInputProps {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
export interface FormInputPropsRHF<T extends FieldValues> extends FormInputProps {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError;
}
