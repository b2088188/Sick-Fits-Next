import { useQuery } from 'react-query';
import { client } from '../lib/api-client';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCTS_QUERY = ` query ALL_PRODUCTS_QUERY{
	allProducts{
		id
		name
		price
		description
		photo{
			id
			image{
				publicUrlTransformed
			}
		}
	}
}`;

const ProductsList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 60px;
`;

function Products() {
	const { data: products } = useQuery({
		queryKey: 'products',
		queryFn: () =>
			client(``, { method: 'POST', query: ALL_PRODUCTS_QUERY }).then(
				({ data }) => data.allProducts
			)
	});

	return (
		<div>
			<ProductsList>
				{products.map((el) => (
					<Product product={el} key={el.id} />
				))}
			</ProductsList>
		</div>
	);
}

export default Products;
