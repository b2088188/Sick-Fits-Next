import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import IndividualProduct from '../../components/IndividualProduct';
import { getProductQuery } from '../../lib/query/product';
import { client } from '../../lib/api-client';
import { getAllProductsQuery } from '../../lib/query/product';

function IndividualProductPage() {
	return <IndividualProduct />;
}

export async function getStaticProps({ params }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['product', { productId: params.productId }],
		queryFn: () =>
			client(``, { method: 'POST', query: getProductQuery(params.productId) }).then(
				({ data }) => data.Product
			)
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
}

export async function getStaticPaths() {
	const {
		data: { allProducts: products }
	} = await client(``, { method: 'POST', query: getAllProductsQuery() });
	const productPaths = products.reduce((acc, cur) => {
		return [
			...acc,
			{
				params: {
					productId: cur.id
				}
			}
		];
	}, []);
	return {
		paths: productPaths,
		fallback: 'blocking'
	};
}

export default IndividualProductPage;
