import * as React from 'react';
import { Alert, Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import rupiahFormat from 'rupiah-format';
import { API } from '../../config/api';

export const AdminTransaction = () => {
	const { data: transactions, refetch: refetchTransaction } = useQuery(
		'myTransactionCache',
		async () => {
			const response = await API.get('/all-transactions');
			console.log(response.data.data);
			return response.data.data;
		}
	);
	const allProducts = transactions?.map((item) => item.products);
	allProducts?.forEach((test) => console.log(test.name));
	// const test = allProductsName?.map((item) => item.name);

	// React.useEffect(() => {
	// 	console.log(test);
	// }, [test]);

	return (
		<Container>
			<h1 className='main-text-color fs-2 mb-5'>Income Transaction</h1>
			<div>
				<Table striped bordered hover>
					<thead>
						<tr className='bg-secondary text-light'>
							<th>No</th>
							<th>Name</th>
							<th>Products Order</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{transactions?.map((item, index) => (
							<tr>
								<td className='text-center'>{index + 1}</td>
								<td className='text-center'>{item.user.fullName}</td>
								<td className='text-center'>
									{[...item.products]
										.map((product) => product.productName)
										.join(', ')}
								</td>
								<td className='secondary-text-color text-center'>
									{rupiahFormat.convert(item.totalPrice)}
								</td>
								<td className='text-success font-weight-bold'>
									<Alert
										variant='success'
										className='p-1 d-flex align-items-center justify-content-center'
									>
										{item.status}
									</Alert>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Container>
	);
};
