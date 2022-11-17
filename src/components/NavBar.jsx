import * as React from 'react';
import {
	Container,
	Navbar,
	Image,
	Nav,
	Dropdown,
	Badge,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import brandLogo from '../assets/icons/logo.svg';
import { PrimaryButton } from './atoms/PrimaryButton';
import { Register } from './auth/Register';
import { Login } from './auth/Login';

import cartIcon from '../assets/icons/cart-icon.svg';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { LoginContext } from '../contexts/LoginContext';
import { UserContext } from '../contexts/UserContext';

import profileIcon from '../assets/icons/profile-dropdown.svg';
import logoutIcon from '../assets/icons/logout-dropdown.svg';
import productIcon from '../assets/icons/product-dropdown.svg';
import { CartContext } from '../contexts/CartContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';

export const NavBar = () => {
	const navigate = useNavigate();
	const { cartLength, setCartLength } = React.useContext(CartContext);
	const [showRegister, setShowRegister] = React.useState(false);
	const [showLogin, setShowLogin] = React.useState(false);
	const [showDropdown, setShowDropdown] = React.useState(false);

	const { isLogin, setIsLogin } = React.useContext(LoginContext);

	const { profile, setProfile } = React.useContext(UserContext);

	const logoutHandler = () => {
		localStorage.removeItem('token');
		setIsLogin(false);
		setProfile(null);
		navigate('/');
	};

	// get cart data
	const { data: cartData, refetch: refetchCart } = useQuery(
		'cartCache',
		async () => {
			try {
				const response = await API.get('/cart');
				setCartLength(response.data.data.length);

				console.log('my cart:', response.data.data);
				return response.data.data;
			} catch (error) {
				return [];
			}
		}
	);

	React.useEffect(() => {
		refetchCart();
	}, [cartData]);

	document.addEventListener('click', (e) => {
		console.log(!e.target.classList.contains('dropdown-toggle'));
		if (!e.target.classList.contains('dropdown-toggle')) {
			setShowDropdown(false);
		}
	});

	return (
		<>
			<Navbar
				className=' bg-light w-100 shadow px-5 d-flex justify-content-between mb-5'
				expand='lg'
				style={{ height: '75px', zIndex: '999' }}
			>
				<Link to='/'>
					<Image src={brandLogo} alt='logo' />
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
					<Nav className='d-flex gap-3'>
						{isLogin ? (
							<>
								{profile?.role === 'user' && (
									<Link to='/carts'>
										<Image src={cartIcon} alt='cart' width='40px' />
										{cartLength > 0 && (
											<Badge
												bg='danger'
												pill
												style={{ height: '25px', width: '25px' }}
												className='d-flex align-items-center justify-content-center top-0 mt-3 fs-6 position-absolute ms-4'
											>
												{cartLength}
											</Badge>
										)}
									</Link>
								)}
								<div>
									<div onClick={() => setShowDropdown(!showDropdown)}>
										<Image
											src={profile?.photo}
											className='rounded-pill dropdown-toggle'
											style={{
												width: '40px',
												height: '40px',
												backgroundColor: 'gray',
												cursor: 'pointer',
											}}
										/>
									</div>
									{showDropdown && (
										<div
											className='position-absolute bg-light shadow-lg rounded p-2'
											style={{ right: '50px', width: '150px' }}
										>
											{profile?.role === 'user' && (
												<div
													className='d-flex align-items-center border-bottom'
													onClick={() => {
														navigate('/profile');
														setShowDropdown(!showDropdown);
													}}
												>
													<Image src={profileIcon} width='30px' />
													<p>Profile</p>
												</div>
											)}
											{profile?.role === 'admin' && (
												<>
													<div
														className='d-flex align-items-center gap-2 border-bottom'
														style={{ cursor: 'pointer' }}
														onClick={() => {
															navigate('/admin/add-product');
															setShowDropdown(!showDropdown);
														}}
													>
														<Image src={productIcon} width='30px' />
														<p>Add Product</p>
													</div>
													<div
														className='d-flex align-items-center gap-2 border-bottom'
														style={{ cursor: 'pointer' }}
														onClick={() => {
															navigate('/admin/products');
															setShowDropdown(!showDropdown);
														}}
													>
														<Image src={productIcon} width='30px' />
														<p>List Product</p>
													</div>
												</>
											)}
											<div
												className='d-flex align-items-center gap-2'
												style={{ cursor: 'pointer' }}
												onClick={() => {
													logoutHandler();
													setShowDropdown(!showDropdown);
												}}
											>
												<Image src={logoutIcon} width='30px' />
												<p>Logout</p>
											</div>
										</div>
									)}
								</div>
							</>
						) : (
							<>
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
							</>
						)}
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
