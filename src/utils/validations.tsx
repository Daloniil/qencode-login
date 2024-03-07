export const emailValidate = (value: string) => {
    if (!value) return {message: 'Email is required'};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return {message: 'Email is not valid'};
    return {message: ''};
};

export const passwordValidate = (value: string) => {
    if (!value) return {message: 'Password is required'};
    if (value.length < 8) return {message: 'Password must be at least 8 characters'};
    return {message: ''};
};

export const initialLoginState = {email: '', password: ''}
export const validationsLogin = {email: emailValidate, password: passwordValidate}


export const initialResetPasswordState = {email: ''}
export const validationsResetPassword = {email: emailValidate}

export const initialCreatePasswordState = {password: '', password_confirm: ''}
