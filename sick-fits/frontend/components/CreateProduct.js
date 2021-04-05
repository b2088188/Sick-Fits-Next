import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useMutation, useQueryClient } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import { client } from '../lib/api-client';
import gql from 'graphql-tag';

// photo:{
// 	create:{
// 		image:${image},
// 		altText:"${name}"
// 	}
// }
function createProductMutation(inputs) {
	const { name, description, price, image } = inputs;

	return `
	mutation {
  createProduct(data:{
    name:"${name}",
    description:"${description}",
    price:${price},
    status:"AVAILABLE"
  }){
    id
    name
		price
    description
  }
}
`;
}

function CreateProduct() {
	const queryClient = useQueryClient();
	const { inputs, handleChange, resetForm, clearForm } = useForm({
		name: '',
		price: 0
	});
	const { mutate: create, isLoading, error } = useMutation({
		mutationFn: (inputs) =>
			client(``, { method: 'POST', query: createProductMutation(inputs) })
				.then(({ data }) => data.allProducts)
				.catch((err) => {
					throw err;
				}),

		onSettled: () => queryClient.invalidateQueries('products')
	});

	async function onSubmit(e) {
		e.preventDefault();
		create(inputs);
	}

	return (
		<Form onSubmit={onSubmit}>
			<ErrorMessage error={error} />
			<fieldset aria-busy={isLoading} disabled={isLoading}>
				<label htmlFor='image'>Image</label>
				<input type='file' id='image' name='image' onChange={handleChange} />
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
			<button>+ Add Product</button>
		</Form>
	);
}

export default CreateProduct;
