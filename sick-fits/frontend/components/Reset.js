import Form from './styles/Form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { resetMutation } from '../lib/mutation/user';
import { client } from '../lib/api-client';
import Error from './ErrorMessage';
import { useRouter } from 'next/router';

function Reset() {
	const {
		query: { token }
	} = useRouter();
	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm();
	const { mutate: reset, error } = useMutation({
		mutationFn: (formValues) => client(``, { method: 'POST', query: resetMutation(formValues) }),
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

	function onReset(formValues) {
		reset({ ...formValues, token });
	}

	return (
		<Form method='POST' onSubmit={handleSubmit(onReset)}>
			<h2>Reset your Password</h2>
			<Error error={error} />
			<fieldset>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' {...register('email')} />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' {...register('password')} />
				<button>Request Reset!</button>
			</fieldset>
		</Form>
	);
}

export default Reset;
