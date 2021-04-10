import Form from './styles/Form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { signUpMutation } from '../lib/mutation/user';
import { client } from '../lib/api-client';
import Error from './ErrorMessage';

function SignUp() {
	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm();
	const { mutate: signup, error } = useMutation({
		mutationFn: (formValues) => client(``, { method: 'POST', query: signUpMutation(formValues) }),
		onSuccess: (res) => {
			if (res.errors) throw res.errors[0];
			const {
				data: { createUser: user }
			} = res;
			queryClient.setQueryData('user', user);
		}
	});

	return (
		<Form method='POST' onSubmit={handleSubmit(signup)}>
			<h2>Sign Up Your Account</h2>
			<Error error={error} />
			<fieldset>
				<label htmlFor='name'>Name</label>
				<input type='name' id='name' {...register('name')} />
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' {...register('email')} />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' {...register('password')} />
				<button>Sign Up!</button>
			</fieldset>
		</Form>
	);
}

export default SignUp;
