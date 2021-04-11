import styled from 'styled-components';
import { removeFromCartMutation } from '../lib/mutation/cart';
import { client } from '../lib/api-client';
import { useMutation, useQueryClient } from 'react-query';

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		cursor: pointer;
		color: var(--color-red);
	}
`;

function RemoveFromCart({ id }) {
	const queryClient = useQueryClient();
	const { mutate: removeFromCart, isLoading } = useMutation({
		mutationFn: ({ id }) => client('', { method: 'POST', query: removeFromCartMutation(id) }),
		onSettled: () => queryClient.invalidateQueries('user'),
		onMutate: ({ id }) => {
			const prevData = queryClient.getQueryData('user');
			queryClient.setQueryData('user', (oldData) => {
				const cart = oldData.cart.filter((el) => el.id !== id);
				return { ...oldData, cart };
			});
			return () => queryClient.setQueryData('user', prevData);
		},
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') recover();
		}
	});
	return (
		<BigButton
			disabled={isLoading}
			title='Remove This Item from Cart'
			onClick={() => removeFromCart({ id })}
		>
			&times;
		</BigButton>
	);
}

export default RemoveFromCart;
