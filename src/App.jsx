import * as React from 'react';
import reactLogo from './assets/react.svg';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Router,
	Routes,
} from 'react-router-dom';

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
import { AdminTransaction } from './pages/admin/AdminTransaction';
import { AddProduct } from './pages/admin/AddProduct';
import { ProductList } from './pages/admin/ProductList';
import { UpdateProduct } from './pages/admin/UpdateProduct';

function AuthRouter() {
	return localStorage.token ? <Outlet /> : <Navigate to='/' />;
}

function AdminRouter() {
	const { profile, refetchProfile } = React.useContext(UserContext);
	return profile?.role == 'admin' ? <Outlet /> : <Navigate to='/' />;
}

function UserRouter() {
	const { profile, refetchProfile } = React.useContext(UserContext);
	return profile?.role == 'user' ? (
		<Outlet />
	) : (
		<Navigate to='/admin/transactions' />
	);
}

function App() {
	const [isLogin, setIsLogin] = React.useState(false);
	const midtransClientKey = import.meta.env.VITE_MY_MIDTRANS_CLIENT_KEY;

	React.useEffect(() => {
		if (localStorage.token) {
			console.log('midtrans:', midtransClientKey);
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
								{/* auth routes */}
								<Route path='/' element={<AuthRouter />}>
									<Route path='/' element={<UserRouter />}>
										<Route path='/product/:id' element={<ProductDetail />} />
										<Route path='/profile' element={<Profile />} />
										<Route path='/carts' element={<CartOrder />} />
									</Route>
									{/* admin */}
									<Route path='/' element={<AdminRouter />}>
										<Route
											path='/admin/transactions'
											element={<AdminTransaction />}
										/>
										<Route path='/admin/add-product' element={<AddProduct />} />
										<Route
											path='/admin/update-product/:id'
											element={<UpdateProduct />}
										/>
										<Route path='/admin/products' element={<ProductList />} />
									</Route>
								</Route>
								{/* page not found */}
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
