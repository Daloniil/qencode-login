import useForm from './useForm.ts';

const useResetPassword = () => {
	const { form, onChange, error, updateError } = useForm(
		{
			email: '',
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
		},
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await fetch(
			'https://auth-qa.qencode.com/v1/auth/password-reset',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: form.email,
					redirect_url: `${document.location.origin}/create-new-password`,
				}),
			},
		);

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
	};

	return { form, onChange, error, handleSubmit };
};

export default useResetPassword;
