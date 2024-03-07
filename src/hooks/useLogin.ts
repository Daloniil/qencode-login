import axios from 'axios';
import useForm from "./useForm.ts";
import {BASE_URL} from "../utils/axios.ts";
import {initialLoginState, validationsLogin} from "../utils/validations.tsx";
import {LoginForm, UseLoginReturn} from "../interfaces/LoginInterface.ts";


export const useLogin = (): UseLoginReturn => {
    const {form, onChange, error, updateError} = useForm<LoginForm>(initialLoginState, validationsLogin);

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

