import { useRouter } from 'next/router';
import Products from '../../components/Products';
import { client } from '../../lib/api-client';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getAllProductsQuery } from '../../lib/query/product';
import Pagination from '../../components/Pagination';

const ProductPage = () => {
	const {
		query: { page }
	} = useRouter();

	return (
		<>
			<Products page={page === undefined ? 1 : Number(page)} />
			<Pagination page={page === undefined ? 1 : Number(page)} />
		</>
	);
};

// export async function getStaticProps() {
// 	const queryClient = new QueryClient();
// 	await queryClient.prefetchQuery({
// 		queryKey: 'products',
// 		queryFn: () =>
// 			client(``, { method: 'POST', query: getAllProductsQuery() }).then(
// 				({ data }) => data.allProducts
// 			)
// 	});

// 	return {
// 		props: {
// 			dehydratedState: dehydrate(queryClient)
// 		}
// 	};
// }

export default ProductPage;
