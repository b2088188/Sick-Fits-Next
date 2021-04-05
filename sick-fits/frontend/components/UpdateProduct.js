import { useRouter } from 'next/router';
import { getProductQuery } from '../lib/query/product';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { client } from '../lib/api-client';
import { updateProductMutation } from '../lib/mutation/product';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from '../components/ErrorMessage';

function UpdateProduct() {
	const queryClient = useQueryClient();
	const {
		query: { productId }
	} = useRouter();
	const { data: product, isLoading, error } = useQuery({
		queryKey: ['product', { productId }],
		queryFn: () =>
			client(``, { method: 'POST', query: getProductQuery(productId) }).then(
				({ data }) => data.Product
			)
	});

	const { mutate: update, isUpdateLoading, errorUpdate } = useMutation({
		mutationFn: (updates) =>
			client(``, { method: 'POST', query: updateProductMutation(updates) }),
		onSettled: () => queryClient.invalidateQueries('products')
	});

	const { inputs, handleChange, resetForm, clearForm } = useForm({
		name: '',
		description: '',
		price: 0
	});

	function onSubmit(e) {
		e.preventDefault();
		update({
			id: productId,
			name: inputs.name,
			description: inputs.description,
			price: inputs.price
		});
	}

	return (
		<Form onSubmit={onSubmit}>
			<ErrorMessage error={error || errorUpdate} />
			<fieldset aria-busy={isUpdateLoading} disabled={isUpdateLoading}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Name'
					value={inputs.name}
					onChange={handleChange}
				/>
				<label htmlFor='price'>Price</label>
				<input
					type='number'
					id='price'
					name='price'
					placeholder='Price'
					value={inputs.price}
					onChange={handleChange}
				/>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					placeholder='Description'
					value={inputs.description}
					onChange={handleChange}
				/>
			</fieldset>
			<button>Update Product</button>
		</Form>
	);
}

export default UpdateProduct;
