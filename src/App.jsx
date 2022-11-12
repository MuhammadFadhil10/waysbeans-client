import * as React from 'react';
import reactLogo from './assets/react.svg';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { LoginContext } from './contexts/LoginContext';
import { UserContext, UserProvider } from './contexts/UserContext';
import { API, setAuthToken } from './config/api';
import { ProductDetail } from './pages/ProductDetail';
import { Profile } from './pages/Profile';
import { CartProvider } from './contexts/CartContext';
import { CartOrder } from './pages/CartOrder';
import { NotFound } from './pages/error/NotFound';

function App() {
	const [isLogin, setIsLogin] = React.useState(false);

	React.useEffect(() => {
		if (localStorage.token) {
			console.log(localStorage.token);
			setAuthToken(localStorage.token);
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [localStorage.token]);

	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<LoginContext.Provider value={{ isLogin, setIsLogin }}>
				<UserProvider>
					<CartProvider>
						<BrowserRouter>
							<NavBar />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/product/:id' element={<ProductDetail />} />
								<Route path='/profile' element={<Profile />} />
								<Route path='/carts' element={<CartOrder />} />
								<Route path='*' element={<NotFound />} />
							</Routes>
						</BrowserRouter>
					</CartProvider>
				</UserProvider>
			</LoginContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
