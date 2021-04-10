import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import { useQuery } from 'react-query';
import { getCurrentUserQuery } from '../lib/query/user';
import { getAllCartItemsQuery } from '../lib/query/cart';
import { request } from 'graphql-request';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../context/cart-context';

const CartItemStyles = styled.div`
	padding: 1rem 0;
	border-bottom: solid 1px var(--color-grey--light);
	display: grid;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right: 1rem;
	}
	h3,
	p {
		margin: 0;
	}
`;

function Cart() {
	const { data: user, isLoading } = useQuery({
		queryKey: 'user',
		queryFn: () =>
			request('http://localhost:3000/api/graphql', getCurrentUserQuery).then((res) => ({
				id: '60442879bcb49a1db8a64e70',
				name: 'Shunze',
				email: 'shunze@gmail.com'
			}))
	});
	const { data: cartItems } = useQuery({
		queryKey: ['cart-items', { user }],
		queryFn: () =>
			request('http://localhost:3000/api/graphql', getAllCartItemsQuery).then(
				(res) => res.allCartItems
			),
		placeholderData: [],
		enabled: !!user
	});

	const { cartOpen, setCartOpen } = useCart();

	if (isLoading) return null;
	return (
		<CartStyles open={cartOpen}>
			<header>
				<Supreme>{user.name}'s Cart</Supreme>
			</header>
			<CloseButton onClick={() => setCartOpen(false)}>&times;</CloseButton>
			<ul>
				{cartItems.map((el) => {
					return <CartItem key={el.id} cartItem={el} />;
				})}
			</ul>
			<footer>
				<p>{formatMoney(calcTotalPrice(cartItems))}</p>
			</footer>
		</CartStyles>
	);
}

function CartItem({ cartItem }) {
	const { product } = cartItem;
	return (
		<CartItemStyles>
			<img width='100' src={product.photo.image.publicUrlTransformed} alt={product.name} />
			<div>
				<h3>{product.name}</h3>
				<p>
					{formatMoney(product.price * cartItem.quantity)}-
					<em>
						{cartItem.quantity} &times; {formatMoney(product.price)}
						each
					</em>
				</p>
			</div>
		</CartItemStyles>
	);
}

export default Cart;
