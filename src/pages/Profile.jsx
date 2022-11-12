import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';
import { API } from '../config/api';
import { UserContext } from '../contexts/UserContext';

export const Profile = () => {
	const navigate = useNavigate();

	// const role = localStorage.role;
	const { profile, refetchProfile } = useContext(UserContext);

	// const { data: myTransaction, refetch: refetchTransaction } = useQuery(
	// 	'myTransactionCache',
	// 	async () => {
	// 		const response = await API.get('/my-transaction');
	// 		console.log(response.data.data);
	// 		return response.data.data;
	// 	}
	// );

	useEffect(() => {
		refetchProfile();
	}, []);

	return (
		<Container className='mt-5'>
			<Row>
				<Col className='col-12 col-lg-6'>
					<h1 className='fs-3 mb-5'>My Profile</h1>
					<Row className='d-flex justify-content-star'>
						<Col className='col-5 col-lg-4'>
							<Image src={profile?.photo} width='100%' />
							<PrimaryButton
								btnName='Edit Profile'
								className='w-100 mt-3 border-0'
								onClick={() => navigate(`/profile/edit/${profile?.id}`)}
							/>
						</Col>
						<Col>
							<div>
								<h1 className='fs-5'>Full Name</h1>
								<p>{profile?.fullName}</p>
							</div>
							<div>
								<h1 className='fs-5'>Email</h1>
								<p>{profile?.email}</p>
							</div>
						</Col>
					</Row>
				</Col>
				<Col className='col-12 col-lg-6'>
					<p className='fs-3 mb-5'>My Transaction</p>
					<div style={{ maxHeight: '300px', overflow: 'scroll' }}>
						{/* {myTransaction?.map((transaction) => {
							return (
						<Card
							className='shadow d-flex flex-row justify-content-between p-2 mb-3'
							style={{ borderBox: 'box-sizing' }}
						>
							<div className=' d-flex flex-column justify-content-between '>
								<div style={{ lineHeight: '10px' }}>
									<p>{transaction.seller.fullName}</p>
								</div>
								<p className='text-danger'>{transaction.totalPrice}</p>
							</div>
							<div className='d-flex flex-column align-items-center gap-3 w-25'>
								<Col>
									<Image src={logo} />
								</Col>
								<Col className='w-100 d-flex align-items-center justify-content-center'>
									<Alert variant='success' className='p-1 w-100 text-center'>
										{transaction.status}
									</Alert>
								</Col>
							</div>
						</Card>
						 );
						})}  */}
					</div>
				</Col>
			</Row>
		</Container>
	);
};
