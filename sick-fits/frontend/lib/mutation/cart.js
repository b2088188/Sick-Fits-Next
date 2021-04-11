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

export { addToCartMutation };
