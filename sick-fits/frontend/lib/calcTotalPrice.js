function calcTotalPrice(cartItems) {
	return cartItems.reduce((acc, cur) => {
		if (!cur.product) return acc;
		return acc + cur.quantity * cur.product.price;
	}, 0);
}

export default calcTotalPrice;
