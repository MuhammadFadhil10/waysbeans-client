import * as React from 'react';
import {
	Button,
	Container,
	Table,
	Image,
	Alert,
	CloseButton,
} from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import rupiahFormat from 'rupiah-format';
import { API } from '../../config/api';

export const ProductList = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { data: products, refetch: refetchProducts } = useQuery(
		'productsCache',
		async () => {
			const response = await API.get('/products');
			console.log(response.data.data.products);
			return response.data.data.products;
		}
	);

	const updateHandler = async (productId) => {
		try {
			await API.delete(`/product/${productId}`);
			refetchProducts();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className='d-flex flex-column'>
			{location.state && (
				<Alert variant='light shadow align-self-center w-50 d-flex flex-row align-items-center justify-content-center'>
					<p className='fw-bold text-center' style={{ color: '#469F74' }}>
						{location.state.successMessage}
					</p>
				</Alert>
			)}
			<h1 className='main-text-color fs-2 mb-5'>List Product</h1>

			<div>
				<Table striped bordered>
					<thead>
						<tr className='bg-secondary text-light'>
							<th style={{ width: '10px' }}>No</th>
							<th style={{ width: '100px' }}>Image</th>
							<th>Name</th>
							<th>Stock</th>
							<th>Price</th>
							<th>Description</th>
							<th style={{ width: '10px' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((item, index) => (
							<tr>
								<td>{index + 1}</td>
								<td>
									<Image
										src={item.photo}
										width='100%'
										height='100px'
										style={{ backgroundColor: 'gray' }}
									/>
								</td>
								<td className='text-center'>{item.productName}</td>
								<td className='text-center'>{item.stock}</td>
								<td className='text-center secondary-text-color'>
									{rupiahFormat.convert(item.price)}
								</td>
								<td className='text-center'>{item.description}</td>
								<td className='d-flex gap-2 justify-content-end'>
									<Button
										variant='success'
										style={{ width: '100px' }}
										onClick={() => navigate(`/admin/update-product/${item.id}`)}
									>
										Update
									</Button>
									<Button
										variant='outline-danger'
										onClick={() => updateHandler(item.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Container>
	);
};