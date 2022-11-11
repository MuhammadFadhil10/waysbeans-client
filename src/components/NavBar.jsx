import * as React from 'react';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import brandLogo from '../assets/icons/logo.svg';
import { PrimaryButton } from './atoms/PrimaryButton';
import { Register } from './auth/Register';
import { Login } from './auth/Login';

export const NavBar = () => {
	const [showRegister, setShowRegister] = React.useState(false);
	const [showLogin, setShowLogin] = React.useState(false);
	return (
		<>
			<Navbar
				className=' bg-light position-fixed position-absolute top-0 w-100 shadow px-5 d-flex justify-content-between'
				expand='lg'
				style={{ height: '75px', zIndex: '999' }}
			>
				<Link to='/'>
					<Image src={brandLogo} alt='logo' />
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
					<Nav className='d-flex gap-3'>
						<PrimaryButton
							btnName='Login'
							outline
							width='100px'
							onClick={() => setShowLogin(true)}
						/>
						<PrimaryButton
							btnName='Register'
							width='100px'
							onClick={() => setShowRegister(true)}
						/>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Register
				show={showRegister}
				setShow={setShowRegister}
				setShowLogin={setShowLogin}
			/>
			<Login
				show={showLogin}
				setShow={setShowLogin}
				setShowRegister={setShowRegister}
			/>
		</>
	);
};
