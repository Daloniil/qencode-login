import classes from '../../styles/features/Password.module.scss';
import useResetPassword from '../../hooks/useResetPassword.ts';
import {Title} from "../../widgets/Title";
import {Input} from "../../widgets/Input";
import {Button} from "../../widgets/Button";

export const ResetPassword = () => {
	const { form, onChange, error, handleSubmit } = useResetPassword();

	return (
		<>
			<Title>Forgot Password?</Title>
			<form className={classes['password__form']} onSubmit={handleSubmit}>
				<Input
					name='email'
					value={form.email}
					onInput={onChange}
					placeholder='Enter your email'
					type='email'
					error={error?.email}
					autoFocus
				/>
				<Button type='submit'>Send</Button>
				<Button type='submit' view='secondary'>
					Cancel
				</Button>
			</form>
		</>
	);
};
