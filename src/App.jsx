import * as React from 'react';
import reactLogo from './assets/react.svg';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { LoginContext } from './contexts/LoginContext';
import { UserContext, UserProvider } from './contexts/UserContext';
import { API, setAuthToken } from './config/api';
import { ProductDetail } from './pages/ProductDetail';

function App() {
	const [isLogin, setIsLogin] = React.useState(false);
	React.useEffect(() => {
		if (localStorage.token) {
			setIsLogin(true);
			setAuthToken(localStorage.token);
		}
	}, [localStorage.token]);
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<LoginContext.Provider value={{ isLogin, setIsLogin }}>
				<UserProvider>
					<BrowserRouter>
						<NavBar />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/product/:id' element={<ProductDetail />} />
						</Routes>
					</BrowserRouter>
				</UserProvider>
			</LoginContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
