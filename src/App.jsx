import * as React from 'react';
import reactLogo from './assets/react.svg';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';

function App() {
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
