import * as React from 'react';
import { Alert, Container, Form, Modal } from 'react-bootstrap';
import { API } from '../../config/api';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { PrimaryInput } from '../atoms/PrimaryInput';

export const Register = ({ show, setShow, setShowLogin }) => {
	const handleClose = () => setShow(false);

	const [regisMessage, setRegisMessage] = React.useState('');
	const [registerStatus, setRegisterStatus] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const [regisData, setRegisData] = React.useState({
		email: '',
		password: '',
		fullname: '',
	});

	const handleChange = (e) => {
		setRegisData({ ...regisData, [e.target.name]: e.target.value });
	};

	const handleRegister = async () => {
		try {
			setIsLoading(true);
			const response = await API.post('/auth/register', regisData);
			setRegisterStatus(response.data.status);
			setIsLoading(false);
			setRegisMessage('Success create your account!');
		} catch (error) {
			setRegisterStatus(error.response.data.status);
			setIsLoading(false);
			setRegisMessage(error.response.data.message);
		}
	};

	// clear alert message after seconds
	React.useEffect(() => {
		if (regisMessage != '') {
			setTimeout(() => {
				setRegisMessage('');
				setRegisData({ ...regisData, email: '', fullname: '', password: '' });
			}, 2500);
		}
	}, [regisMessage]);

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				className=' d-flex flex-column justify-content-center align-items-center'
				// style={{ width: '416px' }}
			>
				<Container
					className='d-flex flex-column gap-4 justify-content-center align-items-center p-5 '
					style={{ width: '416px', height: '600px', zIndex: '9999' }}
				>
					<h1 style={{ color: '#613D2B' }} className='align-self-start'>
						Register
					</h1>
					{regisMessage != '' && (
						<Alert
							variant={registerStatus === 'success' ? 'success' : 'danger'}
						>
							{regisMessage != '' && regisMessage}
						</Alert>
					)}
					<Form className='w-100 d-flex flex-column gap-3'>
						<PrimaryInput
							label='Email'
							type='email'
							placeholder='email'
							name='email'
							value={regisData.email}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryInput
							label='Password'
							type='password'
							placeholder='password'
							name='password'
							value={regisData.password}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryInput
							label='Full Name'
							type='text'
							placeholder='text'
							name='fullname'
							value={regisData.fullname}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryButton
							btnName='Register'
							onClick={handleRegister}
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
								setShowLogin(true);
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
