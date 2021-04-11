import Form from './styles/Form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { signInMutation } from '../lib/mutation/user';
import { client } from '../lib/api-client';
import Error from './ErrorMessage';

function SignIn() {
	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm();
	const { mutate: signin, error } = useMutation({
		mutationFn: (formValues) => client(``, { method: 'POST', query: signInMutation(formValues) }),
		onSuccess: ({ data }) => {
			if (data.authenticateUserWithPassword.code === 'FAILURE')
				throw data.authenticateUserWithPassword;
			queryClient.invalidateQueries('user');
		}
	});

	return (
		<Form method='POST' onSubmit={handleSubmit(signin)}>
			<h2>Sign Into Your Account</h2>
			<Error error={error} />
			<fieldset>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' {...register('email')} />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' {...register('password')} />
				<button>Sign In!</button>
			</fieldset>
		</Form>
	);
}

export default SignIn;
