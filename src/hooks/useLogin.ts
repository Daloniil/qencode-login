import useForm from "./useForm.ts";

interface UseLoginReturn {
    form: {
        email: string;
        password: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: { [key: string]: string } | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isShowPassword: boolean;
}

const useLogin = (): UseLoginReturn => {
    const { form, onChange, error, updateError } = useForm(
        {
            email: '',
            password: '',
        },
        {
            email: (value) => {
                if (!value) {
                    return { message: 'Email is required' };
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return { message: 'Email is not valid' };
                }
                return { message: '' };
            },
            password: (value) => {
                if (!value) {
                    return { message: 'Password is required' };
                }
                if (value.length < 8) {
                    return {
                        message: 'Password must be at least 8 characters',
                    };
                }

                return { message: '' };
            },
        },
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('https://auth-qa.qencode.com/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (response.status !== 200) {
            const data = await response.json();
            if (typeof data.detail === 'string') {
                updateError('email', data.detail);
                return;
            }
            data.detail.forEach((detail: { error: string; field_name: string }) => {
                updateError(detail.field_name, detail.error);
            });
            return;
        }

        const data = await response.json();

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
    };

    const isShowPassword = !!(form.email && !error?.email);

    return { form, onChange, error, handleSubmit, isShowPassword };
};

export default useLogin;