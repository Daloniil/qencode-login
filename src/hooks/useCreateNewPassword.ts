import useForm from './useForm.ts';

export const useCreateNewPassword = () => {
	const { form, onChange, error, updateError } = useForm(
		{
			password: '',
			password_confirm: '',
		},
		{
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
			password_confirm: (value) => {
				if (!value) {
					return { message: 'Password is required' };
				}
				if (value !== form.password) {
					return { message: 'Passwords do not match' };
				}

				return { message: '' };
			},
		},
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await fetch(
			'https://auth-qa.qencode.com/v1/auth/password-set',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: document.location.search.split('=')[1],
					secret: document.location.search.split('=')[2],
					password: form.password,
					password_confirm: form.password_confirm,
				}),
			},
		);

		if (response.status !== 200) {
			const data = await response.json();
			if (typeof data.detail === 'string') {
				updateError('password', data.detail);
				return;
			}
			data.detail.forEach((detail: { error: string; field_name: string }) => {
				updateError(detail.field_name, detail.error);
			});
			return;
		}

		document.location.href = '/login';
	};

	return { form, onChange, error, handleSubmit };
};

