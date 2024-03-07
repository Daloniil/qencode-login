import useForm from './useForm.ts';
import axios from 'axios';
import {BASE_URL} from "../utils/axios.ts";
import {initialCreatePasswordState, passwordValidate} from "../utils/validations.tsx";

export const useCreatePassword = () => {
    const {form, onChange, error, updateError} = useForm(initialCreatePasswordState,
        {
            password: passwordValidate,
            password_confirm: (value) => {
                if (!value) return {message: 'Password is required'};
                if (value !== form.password) return {message: 'Passwords do not match'};
                return {message: ''};
            },
        },
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/password-set`, {
                token: new URLSearchParams(document.location.search).get('token'),
                secret: new URLSearchParams(document.location.search).get('secret'),
                password: form.password,
                password_confirm: form.password_confirm,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            document.location.href = '/login';
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                if (typeof data.detail === 'string') {
                    updateError('password', data.detail);
                } else {
                    data.detail.forEach((detail: { error: string; field_name: string }) => {
                        updateError(detail.field_name, detail.error);
                    });
                }
            }
        }
    };

    return {form, onChange, error, handleSubmit};
};
