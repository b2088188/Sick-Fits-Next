import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import { useQuery } from 'react-query';
import { client } from '../lib/api-client';
import { getAllProductsCountQuery } from '../lib/query/product';

function Pagination({ page = 1 }) {
	const { data: count, isLoading, isSuccess } = useQuery({
		queryKey: 'products-count',
		queryFn: () =>
			client(``, { method: 'POST', query: getAllProductsCountQuery() }).then(
				({ data }) => data._allProductsMeta.count
			)
	});

	const pageCount = isSuccess ? Math.ceil(count / process.env.NEXT_PUBLIC_PER_PAGE) : 0;

	return (
		<PaginationStyles>
			{/*<Head>
							<title>
								Sick Fits - Page {page} of {pageCount}
							</title>
						</Head>*/}
			<Link href={`/products/${page - 1}`}>
				<a aria-disabled={page <= 1}>&larr; Prev</a>
			</Link>
			<p>
				Page {page} of {pageCount}
			</p>
			<p>{count} Items Total</p>
			<Link href={`/products/${page + 1}`}>
				<a aria-disabled={page >= pageCount}>&rarr; Next</a>
			</Link>
		</PaginationStyles>
	);
}

export default Pagination;
