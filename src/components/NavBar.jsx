import * as React from 'react';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import brandLogo from '../assets/icons/logo.svg';

export const NavBar = () => {
	return (
		<Navbar
			className='position-fixed top-0 w-100 shadow px-5 d-flex justify-content-between'
			style={{ height: '75px' }}
		>
			<Link to='/'>
				<Image src={brandLogo} alt='logo' />
			</Link>
			{/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
			<Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
				<Nav>
					<Navbar.Text>
						Signed in as: <a href='#login'>Mark Otto</a>
					</Navbar.Text>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
