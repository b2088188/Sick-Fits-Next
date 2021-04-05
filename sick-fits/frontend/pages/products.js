import Products from '../components/Products';
import { client } from '../lib/api-client';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getAllProductsQuery } from '../lib/query/product';

const ProductPage = () => {
	return <Products />;
};

export async function getStaticProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: 'products',
		queryFn: () =>
			client(``, { method: 'POST', query: getAllProductsQuery() }).then(
				({ data }) => data.allProducts
			)
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
}

export default ProductPage;
