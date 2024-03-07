import axios from 'axios';
import useForm from "./useForm.ts";
import {BASE_URL} from "../utils/axios.ts";

interface LoginForm {
    email: string;
    password: string;
}

interface UseLoginReturn {
    form: LoginForm;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: { [key: string]: string } | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isShowPassword: boolean;
}

const useLogin = (): UseLoginReturn => {
    const {form, onChange, error, updateError} = useForm<LoginForm>(
        {
            email: '',
            password: '',
        },
        {
            email: (value) => {
                if (!value) return {message: 'Email is required'};
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return {message: 'Email is not valid'};
                return {message: ''};
            },
            password: (value) => {
                if (!value) return {message: 'Password is required'};
                if (value.length < 8) return {message: 'Password must be at least 8 characters'};
                return {message: ''};
            },
        },
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const {data} = await axios.post(`${BASE_URL}/login`, form, {
                headers: {'Content-Type': 'application/json'},
            });

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseError = error.response?.data;
                if (typeof responseError.detail === 'string') {
                    updateError('email', responseError.detail);
                } else {
                    responseError.detail.forEach(({error, field_name}: { error: string; field_name: string }) => {
                        updateError(field_name, error);
                    });
                }
            } else {
                console.error('Login failed:', error);
            }
        }
    };

    const isShowPassword = !!(form.email && !error?.email);


    return {form, onChange, error, handleSubmit, isShowPassword};
};

export default useLogin;
