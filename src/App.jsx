import * as React from 'react';
import reactLogo from './assets/react.svg';
import {} from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
