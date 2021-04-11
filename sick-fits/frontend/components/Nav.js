import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useQuery } from 'react-query';
import { getCurrentUserQuery } from '../lib/query/user';
import { request } from 'graphql-request';
import SignOut from './SignOut';
import { useCart } from '../context/cart-context';
import { client } from '../lib/api-client';

function Nav() {
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () =>
			client('', { method: 'POST', query: getCurrentUserQuery }).then(({ data }) => {
				if (!data.authenticatedItem) return null;
				return data.authenticatedItem;
			})
	});

	const { setCartOpen } = useCart();

	return (
		<NavStyles>
			<Link href='/products'>Products</Link>
			{user ? (
				<>
					<Link href='/sell'>Sell</Link>
					<Link href='/orders'>Orders</Link>
					<Link href='/account'>Account</Link>
					<SignOut>Sign Out</SignOut>
					<button onClick={() => setCartOpen(true)}>My Cart</button>
				</>
			) : (
				<Link href='/signin'>Sign In</Link>
			)}
		</NavStyles>
	);
}

export default Nav;
