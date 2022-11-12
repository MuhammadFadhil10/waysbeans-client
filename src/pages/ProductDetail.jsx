import * as React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import rupiahFormat from 'rupiah-format';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { API } from '../config/api';

export const ProductDetail = () => {
	const { id } = useParams();

	const { data: product, refetch: refetchProduct } = useQuery(
		'productCahche',
		async () => {
			const response = await API.get(`/product/${id}`);
			return response.data.data;
		}
	);

	return (
		<Container>
			<Row className='d-flex justify-content-center gap-5'>
				<Col
					className='col-11 col-lg-4 bg-danger p-0 '
					style={{ height: '500px' }}
				>
					<Image
						className='bg-secondary d-block w-100 h-100'
						src={product?.photo}
						alt='product image'
						style={{ objectFit: 'fill' }}
					/>
				</Col>
				<Col className='col-11 col-lg-6'>
					<Col>
						<h1 className='main-text-color'>{product?.name}</h1>
						<p className='secondary-text-color'>Stock: {product?.stock}</p>
					</Col>
					<Col className='mb-5 d-flex flex-column'>
						<p>{product?.description}</p>
						<h2 className='secondary-text-color align-self-end fs-3'>
							{rupiahFormat.convert(product?.price)}
						</h2>
					</Col>
					<Col className='col-12'>
						<PrimaryButton btnName='Add Cart' width='100%' />
					</Col>
				</Col>
			</Row>
		</Container>
	);
};
