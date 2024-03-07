import classes from '../../styles/features/Password.module.scss';
import {Title} from "../../widgets/Title";
import {Input} from "../../widgets/Input";
import {Button} from "../../widgets/Button";
import {useCreatePassword} from "../../hooks/useCreatePassword.ts";

export const CreateNewPassword = () => {
    const {form, onChange, error, handleSubmit} = useCreatePassword();

    return (
        <>
            <Title>Create new password?</Title>
            <form
                className={classes['password__form']}
                onSubmit={handleSubmit}
            >
                <Input
                    name='password'
                    value={form.password}
                    onInput={onChange}
                    placeholder='Password'
                    type='password'
                    error={error?.password}
                    autoFocus
                    label='Password'
                />
                <Input
                    name='password_confirm'
                    value={form.password_confirm}
                    onInput={onChange}
                    placeholder='Password'
                    type='password'
                    error={error?.password_confirm}
                    label='Confirm password'
                />
                <Button type='submit'>Reset password</Button>
            </form>
        </>
    );
};
