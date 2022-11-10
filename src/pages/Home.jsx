import * as React from 'react';
import { Container, Image } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { NavBar } from '../components/NavBar';

import bannerImage from '../assets/images/banner-image.png';
import bannerIcon from '../assets/images/banner-icon.svg';
import bannerWaves from '../assets/icons/banner-waves.svg';

export const Home = () => {
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
						<h1>BEST QUALITY COFFEE</h1>
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
				<div></div>
			</Container>
		</>
	);
};
