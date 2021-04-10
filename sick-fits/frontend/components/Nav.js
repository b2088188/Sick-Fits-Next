import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useQuery } from 'react-query';
import { getCurrentUserQuery } from '../lib/query/user';
import { request } from 'graphql-request';
import SignOut from './SignOut';
import { useCart } from '../context/cart-context';

function Nav() {
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () =>
			request('http://localhost:3000/api/graphql', getCurrentUserQuery).then((res) => ({
				id: '60442879bcb49a1db8a64e70',
				name: 'Shunze',
				email: 'shunze@gmail.com'
			}))
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
