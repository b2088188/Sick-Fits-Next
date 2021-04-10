import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useQuery } from 'react-query';
import { getCurrentUserQuery } from '../lib/query/user';
import { client } from '../lib/api-client';
import SignOut from './SignOut';

function Nav() {
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () =>
			client(``, { method: 'POST', query: getCurrentUserQuery() }).then(
				({ data }) => data.authenticatedItem
			)
	});

	return (
		<NavStyles>
			<Link href='/products'>Products</Link>
			{user ? (
				<>
					<Link href='/sell'>Sell</Link>
					<Link href='/orders'>Orders</Link>
					<Link href='/account'>Account</Link>
					<SignOut>Sign Out</SignOut>
				</>
			) : (
				<Link href='/signin'>Sign In</Link>
			)}
		</NavStyles>
	);
}

export default Nav;
