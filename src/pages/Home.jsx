import * as React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { NavBar } from '../components/NavBar';

import bannerImage from '../assets/images/banner-image.png';
import bannerIcon from '../assets/images/banner-icon.svg';
import bannerWaves from '../assets/icons/banner-waves.svg';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import convertRupiah from 'rupiah-format';
import { LoginContext } from '../contexts/LoginContext';
import { UserContext } from '../contexts/UserContext';

export const Home = () => {
	const { data: products, refetch } = useQuery('productsCache', async () => {
		try {
			const response = await API.get('/products');
			return response.data.data.products;
		} catch (error) {
			console.log(error);
		}
	});

	// const { userData, setUserData } = React.useContext(UserContext);

	// React.useEffect(() => {
	// 	console.log(userData);
	// }, []);
	return (
		<>
			<Container className='p-0' style={{ marginTop: '100px' }}>
				<div
					className='pt-2 px-5 d-flex justify-content-between align-items-center'
					style={{
						backgroundColor: '#DBB699',
						width: '90%',
						height: '400px',
					}}
				>
					<div className='w-50' style={{ color: '#000' }}>
						<Image src={bannerIcon} alt='banner icon' width='473px' />
						<h1 className='fs-3'>BEST QUALITY COFFEE BEANS</h1>
						<h2 className='fs-5'>
							Quality freshly roasted coffee made just for you. Pour, brew and
							enjoy
						</h2>
					</div>
					<Image
						src={bannerImage}
						alt='banner image'
						width='432px'
						height='272px'
						className='position-absolute align-self-start'
						style={{ right: '120px' }}
					/>
					<Image
						src={bannerWaves}
						alt='banner'
						width='352px'
						className='align-self-end'
					/>
				</div>
				{/* products container */}
				<div className='mt-5'>
					<Row>
						{products?.map((product) => (
							<Col className='col-3'>
								<Card
									className='mb-5'
									style={{
										backgroundColor: '#F6E6DA',
										border: 'none',
									}}
								>
									<Image
										src={product.photo}
										height='212px'
										style={{ backgroundColor: 'gray' }}
									/>
									<Card.Body>
										<h1 className='fs-4'>{product.name}</h1>
										<p>{convertRupiah.convert(product.price)}</p>
										<p>Stock: {product.stock}</p>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Container>
		</>
	);
};
