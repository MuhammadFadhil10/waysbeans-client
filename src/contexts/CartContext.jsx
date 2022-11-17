import * as React from 'react';
import { useQuery } from 'react-query';
import { API } from '../config/api';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [cartLength, setCartLength] = React.useState(0);

	// const { data: cartData, refetch: refetchCart } = useQuery(
	// 	'cartCache',
	// 	async () => {
	// 		const response = await API.get('/cart');
	// 		setCartLength(response.data.data.length);
	// 		console.log('my cart:', response.data.data);
	// 		return response.data.data;
	// 	}
	// );
	return (
		<CartContext.Provider value={{ cartLength, setCartLength }}>
			{children}
		</CartContext.Provider>
	);
};
