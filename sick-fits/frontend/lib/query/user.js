import { gql } from 'graphql-request';

const getCurrentUserQuery = gql`
	query {
		authenticatedItem {
			... on User {
				id
				email
				name
				cart {
					id
					quantity
					product {
						id
						price
						photo {
							image {
								publicUrlTransformed
							}
						}
						name
						description
					}
				}
			}
		}
	}
`;

export { getCurrentUserQuery };
