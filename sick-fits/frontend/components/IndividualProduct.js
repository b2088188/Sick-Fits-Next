import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { client } from '../lib/api-client';
import { getProductQuery } from '../lib/query/product';
import styled from 'styled-components';

const ProductStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	max-width: var(--maxWidth);
	justify-content: center;
	align-items: top;
	gap: 2rem;
	img {
		width: 100%;
		object-fit: contain;
	}
`;

function IndividualProduct() {
	const {
		query: { productId }
	} = useRouter();
	const { data: product } = useQuery({
		queryKey: ['product', { productId }],
		queryFn: () =>
			client(``, { method: 'POST', query: getProductQuery(productId) }).then(
				({ data }) => data.Product
			)
	});

	return (
		<ProductStyles>
			<Head>
				<title>Sick Fits | {product.name}</title>
			</Head>
			<img src='test.jpg' alt={product.name} />
			<div className='details'>
				<h2>{product.name}</h2>
				<p>{product.description}</p>
			</div>
		</ProductStyles>
	);
}

export default IndividualProduct;
