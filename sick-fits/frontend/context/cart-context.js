import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
CartContext.displayName = 'CartContext';

function CartProvider({ children }) {
	const [cartOpen, setCartOpen] = useState(false);
	const value = { cartOpen, setCartOpen };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be wrapped in CartProvider');
	return context;
}

export { CartProvider, useCart };
