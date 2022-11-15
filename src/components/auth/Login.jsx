import * as React from 'react';
import { Alert, Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { LoginContext } from '../../contexts/LoginContext';
import { UserContext } from '../../contexts/UserContext';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { PrimaryInput } from '../atoms/PrimaryInput';

export const Login = ({ show, setShow, setShowRegister }) => {
	const navigate = useNavigate();
	const handleClose = () => setShow(false);

	const { isLogin, setIsLogin } = React.useContext(LoginContext);
	const { profile, refetchProfile } = React.useContext(UserContext);
	const [loginMessage, setLoginMessage] = React.useState('');
	const [loginStatus, setLoginStatus] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	// const profile = React.useContext(UserContext);

	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await API.post('/auth/login', loginData);
			// setProfile(response.data.data.user);
			setIsLogin(true);
			refetchProfile();
			setLoginStatus(response.data.status);
			setIsLoading(false);
			setLoginMessage('Login success');
			localStorage.setItem('token', response.data.data.user.token);
			if (response.data.data.user.role === 'admin') {
				navigate('/admin/transactions');
				setShow(false);
			}
		} catch (error) {
			setLoginStatus(error.response.data.status);
			setIsLoading(false);
			setLoginMessage(error.response.data.message);
		}
	};

	// clear alert message after seconds
	React.useEffect(() => {
		if (loginMessage != '') {
			setTimeout(() => {
				setLoginMessage('');
				if (loginStatus === 'success') {
					setLoginData({ ...loginData, email: '', password: '' });
				}
			}, 2500);
		}
	}, [loginMessage]);

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				className=' d-flex flex-column justify-content-center align-items-center'
			>
				<Container
					className='d-flex flex-column gap-4 justify-content-center align-items-center p-5 '
					style={{ width: '416px', height: '600px', zIndex: '9999' }}
				>
					<h1 style={{ color: '#613D2B' }} className='align-self-start'>
						Login
					</h1>
					{loginMessage != '' && (
						<Alert variant={loginStatus === 'success' ? 'success' : 'danger'}>
							{loginMessage != '' && loginMessage}
						</Alert>
					)}
					<Form className='w-100 d-flex flex-column gap-3'>
						<PrimaryInput
							label='Email'
							type='email'
							placeholder='email'
							name='email'
							value={loginData.email}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryInput
							label='Password'
							type='password'
							placeholder='password'
							name='password'
							value={loginData.password}
							onChange={(e) => handleChange(e)}
						/>

						<PrimaryButton
							btnName='Login'
							onClick={handleLogin}
							isLoading={isLoading}
						/>
					</Form>
					<p className='text-muted'>
						Already have an account ? Click{' '}
						<span
							style={{ cursor: 'pointer' }}
							className='text-primary cursor-pointer'
							onClick={() => {
								setShow(false);
								setShowRegister(true);
							}}
							clasName='text-primary'
						>
							Here
						</span>
					</p>
				</Container>
			</Modal>
		</>
	);
};
