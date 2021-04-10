import Form from './styles/Form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { requestResetMutation } from '../lib/mutation/user';
import { client } from '../lib/api-client';
import Error from './ErrorMessage';

function RequestReset() {
	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm();
	const { mutate: requestReset, error } = useMutation({
		mutationFn: (formValues) =>
			client(``, { method: 'POST', query: requestResetMutation(formValues) }),
		onSuccess: (res) => {
			console.log(res);
			// if (data.authenticateUserWithPassword.code === 'FAILURE')
			// 	throw data.authenticateUserWithPassword;
			// const {
			// 	authenticateUserWithPassword: { item }
			// } = data;
			// queryClient.setQueryData('user', item);
		}
	});

	return (
		<Form method='POST' onSubmit={handleSubmit(requestReset)}>
			<h2>Request a Password Reset</h2>
			<Error error={error} />
			<fieldset>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' {...register('email')} />
				<button>Request Reset!</button>
			</fieldset>
		</Form>
	);
}

export default RequestReset;
