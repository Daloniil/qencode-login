import {Link} from 'react-router-dom';

import classes from '../../styles/features/Login.module.scss';
import googleIcon from '../../assets/google.svg';
import githubIcon from '../../assets/github.svg';
import {Title} from "../../widgets/Title";
import {Input} from "../../widgets/Input";
import {IconButton} from "../../widgets/IconButton";
import {Button} from "../../widgets/Button";


import useLogin from '../../hooks/useLogin';

export const Login = () => {
    const { form, onChange, error, handleSubmit, isShowPassword } = useLogin();

    return (
        <>
            <Title>Log in to your account</Title>
            <div className={classes['login__method-buttons']}>
                <IconButton icon={googleIcon} text='Google' />
                <IconButton icon={githubIcon} text='GitHub' />
            </div>
            <div className={classes['login__separator']} />
            <form className={classes['login__form']} onSubmit={handleSubmit}>
                <Input
                    name='email'
                    value={form.email}
                    onInput={onChange}
                    placeholder='Work email'
                    type='email'
                    error={error?.email}
                    autoFocus
                />
                {isShowPassword && (
                    <>
                        <Input
                            name='password'
                            value={form.password}
                            onChange={onChange}
                            placeholder='Password'
                            type='password'
                            error={error?.password}
                        />
                        <Link className={classes['login__link']} to='/reset-password'>
                            Forgot your password?
                        </Link>
                    </>
                )}

                <Button type='submit'>Log in to Qencode</Button>
            </form>
            <p className={classes['login__register']}>
                Is your company new to Qencode?
                <a className={classes['login__link']} href='#'>
                    Sign up
                </a>
            </p>
        </>
    );
};