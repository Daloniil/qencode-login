export interface LoginForm {
    email: string;
    password: string;
}

export interface UseLoginReturn {
    form: LoginForm;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: { [key: string]: string } | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isShowPassword: boolean;
}