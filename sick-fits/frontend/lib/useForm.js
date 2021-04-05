import { useState } from 'react';

function useForm(initialState = {}) {
	const [inputs, setInputs] = useState(initialState);
	function handleChange(e) {
		const { value, name, type } = e.target;
		let inputValue;
		if (type === 'number') {
			inputValue = Number(value);
		} else if (type === 'file') {
			// inputValue = e.target.files[0];
			[inputValue] = e.target.files;
		} else {
			inputValue = value;
		}
		setInputs({
			...inputs,
			[e.target.name]: inputValue
		});
	}

	function resetForm() {
		setInputs(initialState);
	}

	function clearForm() {
		const keys = Object.keys(inputs);
		let clearState = keys.reduce((acc, cur) => {
			acc[cur] = '';
			return acc;
		}, {});

		setInputs(clearState);
	}

	return { inputs, handleChange, resetForm, clearForm };
}

export default useForm;
