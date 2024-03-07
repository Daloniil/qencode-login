import { ChangeEvent, useState } from 'react';

const useForm = <T>(
	initialState: T,
	validations: { [key: string]: (value: string) => { message: string } },
) => {
	const [form, setForm] = useState<T>(initialState);
	const [error, setError] = useState<{
		[key: string]: string;
	} | null>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });

		if (validations) {
			const validation = validations[e.target.name];
			if (validation) {
				const { message } = validation(e.target.value);
				setError({ ...error, [e.target.name]: message });
			}
		}
	};

	const updateError = (key: string, message: string) => {
		setError({ ...error, [key]: message });
	};

	return { onChange, form, error, updateError };
};

export default useForm;
