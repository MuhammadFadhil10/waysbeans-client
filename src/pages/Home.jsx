import * as React from 'react';
import { Container } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';

export const Home = () => {
	return (
		<Container>
			<h1>Hello from home</h1>
			<PrimaryButton btnName='Add Cart' />
		</Container>
	);
};
