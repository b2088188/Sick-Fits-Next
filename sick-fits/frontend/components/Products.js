import { useQuery } from 'react-query';
import { client } from '../lib/api-client';
import styled from 'styled-components';
import Product from './Product';
import { getAllProductsQuery } from '../lib/query/product';

const ProductsList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 60px;
`;

function Products({ page }) {
	const { data: products, isLoading } = useQuery({
		queryKey: ['products', { page }],
		queryFn: () =>
			client(``, {
				method: 'POST',
				query: getAllProductsQuery({
					page
				})
			}).then(({ data }) => data.allProducts),
		placeholderData: []
	});

	return (
		<div>
			<ProductsList>
				{products?.map((el) => (
					<Product product={el} key={el.id} />
				))}
			</ProductsList>
		</div>
	);
}

export default Products;
