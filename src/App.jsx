import * as React from 'react';
import reactLogo from './assets/react.svg';
import {} from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
