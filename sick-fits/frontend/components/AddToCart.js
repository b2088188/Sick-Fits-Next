import { addToCartMutation } from '../lib/mutation/cart';
import { useMutation, useQueryClient } from 'react-query';
import { request } from 'graphql-request';
import { client } from '../lib/api-client';
import { useCart } from '../context/cart-context';

function AddToCart({ id, children }) {
	const queryClient = useQueryClient();
	const { mutate: addToCart, isLoading } = useMutation({
		mutationFn: ({ id }) => client('', { method: 'POST', query: addToCartMutation(id) }),
		onSettled: () => queryClient.invalidateQueries('user'),
		onSuccess: () => setCartOpen(true)
	});
	const { setCartOpen } = useCart();

	return (
		<button disabled={isLoading} onClick={() => addToCart({ id })}>
			{children}
		</button>
	);
}

export default AddToCart;
