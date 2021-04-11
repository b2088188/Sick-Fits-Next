import { addToCartMutation } from '../lib/mutation/cart';
import { useMutation } from 'react-query';
import { request } from 'graphql-request';
import { client } from '../lib/api-client';

function AddToCart({ id, children }) {
	const { mutate: addToCart } = useMutation({
		mutationFn: ({ id }) => client('', { method: 'POST', query: addToCartMutation(id) })
	});

	return <button onClick={() => addToCart({ id })}>{children}</button>;
}

export default AddToCart;
