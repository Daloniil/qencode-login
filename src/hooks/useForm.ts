import { ChangeEvent, useState, useCallback } from 'react';

const useForm = <T,>(
	initialState: T,
	validations: { [key: string]: (value: string) => { message: string } },
) => {
	const [form, setForm] = useState<T>(initialState);
	const [error, setError] = useState<{ [key: string]: string } | null>(null);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));

		if (validations[name]) {
			const { message } = validations[name](value);
			setError((prevError) => ({ ...prevError, [name]: message }));
		}
	}, [validations]);

	const updateError = useCallback((key: string, message: string) => {
		setError((prevError) => ({ ...prevError, [key]: message }));
	}, []);

	return { onChange, form, error, updateError };
};

export default useForm;
