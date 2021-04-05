function updateProductMutation(updates) {
	const { id, name, description, price } = updates;

	return `
	mutation {
		updateProduct(
		id:"${id}",
		data:{
			name:"${name}",
			description:"${description}",
			price:${price}
		}
		){
			id 
			name
			description
			price
		}
	}
	`;
}

export { updateProductMutation };
