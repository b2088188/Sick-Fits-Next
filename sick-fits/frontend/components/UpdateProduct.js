import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductQuery } from '../lib/query/product';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { client } from '../lib/api-client';
import { updateProductMutation } from '../lib/mutation/product';
import Form from './styles/Form';
import ErrorMessage from '../components/ErrorMessage';
import { useForm, useFieldArray } from 'react-hook-form';

function UpdateProduct() {
	const queryClient = useQueryClient();
	const {
		query: { productId }
	} = useRouter();
	const { data: product, isLoading, isSuccess, error } = useQuery({
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
	const { register, handleSubmit, setValue } = useForm();

	useEffect(() => {
		if (isSuccess && product) {
			setValue('name', product.name);
			setValue('price', product.price);
			setValue('description', product.description);
		}
	}, [setValue, isSuccess, product]);

	function onSubmit({ name, description, price }) {
		update({
			id: productId,
			name,
			description,
			price
		});
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<ErrorMessage error={error || errorUpdate} />
			<fieldset aria-busy={isUpdateLoading} disabled={isLoading || isUpdateLoading}>
				<label htmlFor='name'>Name</label>
				<input type='text' placeholder='Name' {...register('name')} />
				<label htmlFor='price'>Price</label>
				<input type='number' placeholder='Price' {...register('price')} />
				<label htmlFor='description'>Description</label>
				<textarea placeholder='Description' {...register('description')} />
			</fieldset>
			<button>Update Product</button>
		</Form>
	);
}

export default UpdateProduct;
