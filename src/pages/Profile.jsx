import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';
import { API } from '../config/api';
import { UserContext } from '../contexts/UserContext';

import waysBeanLogo from '../assets/icons/logo.svg';
import transactionBarcode from '../assets/icons/transaction-barcode.svg';

import rupiahFormat from 'rupiah-format';
import Moment, * as moment from 'react-moment';
import 'moment-timezone';

export const Profile = () => {
	const navigate = useNavigate();

	const { profile, refetchProfile } = useContext(UserContext);

	const { data: transactions, refetch: refetchTransaction } = useQuery(
		'myTransactionCache',
		async () => {
			const response = await API.get('/transactions');
			console.log(response.data.data);
			return response.data.data;
		}
	);

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
						{transactions?.map((item) => (
							<Card
								className='shadow d-flex flex-row justify-content-between p-2 mb-3'
								style={{ borderBox: 'box-sizing' }}
							>
								<div className=' d-flex gap-3 '>
									<div>
										<Image
											src={item.products[0].photo}
											style={{ width: '120px', height: '100%' }}
											className='bg-secondary'
										/>
									</div>
									<div className='d-flex flex-column gap-3    '>
										<div style={{ lineHeight: '10px' }}>
											<h1 className='main-text-color fs-3'>
												{item.products[0].name}
											</h1>
											<p>
												<Moment fromNow>
													{item.createdAT}
													{/* 1976-04-19T12:59-0500 */}
												</Moment>
												{/* {' '}
												<Moment fromNow ago>{item.createdAT}</Moment>{' '} */}
											</p>
										</div>
										<div
											className='secondary-text-color'
											style={{ lineHeight: '10px' }}
										>
											{/* <p>Price: {rupiahFormat.convert(item.totalPrice)}</p> */}
											<p>{item.qty}</p>
											<p className='font-weight-bold'>
												<strong>
													Sub Total: {rupiahFormat.convert(item.totalPrice)}
												</strong>
											</p>
										</div>
									</div>
								</div>
								<div className='d-flex flex-column align-items-center gap-3 w-25'>
									<Image src={waysBeanLogo} width='100px' />
									<Image src={transactionBarcode} width='50px' />
									<div className='w-100 d-flex align-items-center justify-content-center'>
										<Alert variant='success' className='p-1 w-100 text-center'>
											{item.status}
										</Alert>
									</div>
								</div>
							</Card>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};
