import { gql } from 'graphql-request';

function addToCartMutation(productId) {
	return `
	mutation{
addToCart(productId:"${productId}"){
  id
}
}
`;
}

function removeFromCartMutation(id) {
	return `
	mutation {
		deleteCartItem(id:"${id}"){
			id
		}
	}
	`;
}

export { addToCartMutation, removeFromCartMutation };
