import axios from 'axios';
import useForm from './useForm.ts';
import {BASE_URL} from "../utils/axios.ts";

const useResetPassword = () => {
    const {form, onChange, error, updateError} = useForm(
        {email: ''},
        {
            email: (value) => {
                if (!value) return {message: 'Email is required'};
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return {message: 'Email is not valid'};
                return {message: ''};
            },
        },
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/password-reset`, {
                    email: form.email,
                    redirect_url: `${window.location.origin}/create-new-password`
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseError = error.response;
                if (responseError && responseError.data && responseError.status !== 200) {
                    const data = responseError.data;
                    if (typeof data.detail === 'string') {
                        updateError('email', data.detail);
                    } else {
                        data.detail.forEach((detail: { error: string; field_name: string }) => {
                            updateError(detail.field_name, detail.error);
                        });
                    }
                }
            }
        }
    };

    return {form, onChange, error, handleSubmit};
};

export default useResetPassword;
