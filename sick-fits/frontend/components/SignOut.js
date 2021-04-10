import { useMutation, useQueryClient } from 'react-query';
import { client } from '../lib/api-client';
import { signOutMutation } from '../lib/mutation/user';

function SignOut({ children }) {
	const queryClient = useQueryClient();
	const { mutate: signout } = useMutation({
		mutationFn: () => client(``, { method: 'POST', query: signOutMutation() }),
		onSuccess: () => queryClient.setQueryData('user', null)
	});

	return <button onClick={signout}>{children}</button>;
}

export default SignOut;
