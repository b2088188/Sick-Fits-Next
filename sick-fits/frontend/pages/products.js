import Products from '../components/Products';
import { client } from '../lib/api-client';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

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

const ProductPage = () => {
	return <Products />;
};

export async function getStaticProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: 'products',
		queryFn: () =>
			client(``, { method: 'POST', query: ALL_PRODUCTS_QUERY }).then(
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
