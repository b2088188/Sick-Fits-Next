import { gql } from 'graphql-request';

const getAllCartItemsQuery = gql`
	query {
		allCartItems {
			id
			quantity
			product {
				id
				name
				price
				description
				photo {
					image {
						publicUrlTransformed
					}
				}
			}
		}
	}
`;

export { getAllCartItemsQuery };
