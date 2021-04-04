import useForm from '../lib/useForm';

function CreateProduct() {
	const { inputs, handleChange, clearForm } = useForm({
		name: '',
		price: 0
	});
	return (
		<form>
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
			<button type='button' onClick={clearForm}>
				Clear Form
			</button>
		</form>
	);
}

export default CreateProduct;
