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

function deleteProductMutation(id) {
	return `
	mutation{
  deleteProduct(id:"${id}"){
    id
    name
  }
}
	`;
}

export { updateProductMutation, deleteProductMutation };
