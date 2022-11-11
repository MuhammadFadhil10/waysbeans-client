import * as React from 'react';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import brandLogo from '../assets/icons/logo.svg';
import { PrimaryButton } from './atoms/PrimaryButton';

export const NavBar = () => {
	return (
		<Navbar
			className='position-fixed position-absolute top-0 w-100 shadow px-5 d-flex justify-content-between'
			expand='lg'
			style={{ height: '75px' }}
		>   
			<Link to='/'>
				<Image src={brandLogo} alt='logo' />
			</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
				<Nav className='d-flex gap-3'>
					<PrimaryButton btnName='Login' outline width='100px' />
					<PrimaryButton btnName='Register' width='100px' />
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
