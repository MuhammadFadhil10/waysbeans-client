import * as React from 'react';
import { Container } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { NavBar } from '../components/NavBar';

export const Home = () => {
	return (
		<>
			<Container className='bg-danger' style={{marginTop:"100px"}}>
				<h1>Hello from home</h1>
			</Container>
		</>
	);
};
