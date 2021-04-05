import { useMutation, useQueryClient } from 'react-query';
import { client } from '../lib/api-client';
import { deleteProductMutation } from '../lib/mutation/product';

function DeleteProduct({ id, children }) {
	const queryClient = useQueryClient();
	const { mutate: deleteProduct } = useMutation({
		mutationFn: ({ id }) =>
			client(``, { method: 'POST', query: deleteProductMutation(id) })
				.then(({ data }) => data.Product)
				.catch((err) => {
					throw err;
				}),
		onMutate: ({ id }) => {
			queryClient.setQueryData('products', (oldData) => {
				return oldData.filter((el) => el.id !== id);
			});
		},
		onSettled: () => queryClient.invalidateQueries('products')
	});

	function handleClick() {
		const result = confirm('Are you sure you want to delete this item?');
		if (result) deleteProduct({ id });
	}

	return (
		<button type='button' onClick={handleClick}>
			{children}
		</button>
	);
}

export default DeleteProduct;
