import * as React from 'react';

import { Button, Col, Row, Container, Image } from 'react-bootstrap';
import { PrimaryButton } from '../components/atoms/PrimaryButton';

import { IoTrash } from 'react-icons/io5';
import { CartContext } from '../contexts/CartContext';
import convertRupiah from 'rupiah-format';
import { API } from '../config/api';
import cartEmpty from '../assets/icons/empty-cart.svg';
import { useNavigate } from 'react-router-dom';

export const CartOrder = () => {
	const navigate = useNavigate();
	const { cartData, refetchCart } = React.useContext(CartContext);
	React.useEffect(() => {
		//change this to the script source you want to load, for example this is snap.js sandbox env
		const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;
		//change this according to your client-key
		const myMidtransClientKey = import.meta.env.VITE_MY_MIDTRANS_CLIENT_KEY;

		let scriptTag = document.createElement('script');
		scriptTag.src = midtransScriptUrl;
		// optional if you want to set script attribute
		// for example snap.js have data-client-key attribute
		scriptTag.setAttribute('data-client-key', myMidtransClientKey);

		document.body.appendChild(scriptTag);
		return () => {
			document.body.removeChild(scriptTag);
		};
	}, []);

	const handleQtyCart = async (currentQty, cartId, type) => {
		if (type === 'add') {
			const response = await API.patch(`/cart/${cartId}?update=add`);
			refetchCart();
		} else {
			if (currentQty > 1) {
				const response = await API.patch(`/cart/${cartId}?update=less`);
				refetchCart();
			} else {
				const response = await API.delete(`/cart/delete/${cartId}`);
				refetchCart();
			}
		}
	};

	const handleDeleteCart = async (cartId) => {
		const response = await API.delete(`/cart/delete/${cartId}`);
		refetchCart();
	};

	const handlePayCart = async () => {
		const allProductsCart = cartData?.map((item) => {
			return item.products;
		});
		const totalPrice = subTotal + 10000 * cartData?.length;
		console.log(allProductsCart);
		console.log(totalPrice);
		const body = {
			status: 'pending',
			products: allProductsCart,
			totalPrice: subTotal + 10000 * cartData?.length,
		};

		const response = await API.post('/transaction', body);
		console.log(response.data);
		// midtrans
		const token = response.data.data.token;
		window.snap.pay(token, {
			onSuccess: async function (result) {
				/* You may add your own implementation here */
				// result.order_id
				// console.log('midtrans success:', result);
				// console.log('midtrans orderId:', result.order_id);
				// console.log('midtrans fraud:', result.fraud_status);
				// console.log('midtrans status:', result.transaction_status);
				// alert('dsa');
				const body = {
					order_id: result.order_id,
					fraud_status: result.fraud_status,
					transaction_status: result.transaction_status,
				};

				const response = await API.post('/transaction-process', body);
			},
			onPending: function (result) {
				/* You may add your own implementation here */
				console.log(result);
				navigate('/profile');
			},
			onError: function (result) {
				/* You may add your own implementation here */
				console.log(result);
			},
			onClose: function () {
				/* You may add your own implementation here */
				alert('you closed the popup without finishing the payment');
			},
		});
	};

	// calculate
	const allQty = cartData?.map((item) => item.qty);
	const totalQty = allQty?.reduce((a, b) => a + b, 0);
	const allCartPrice = cartData?.map((item) => item.products.price * item.qty);
	const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);

	return (
		<Container className=' d-flex flex-column gap-3 pt-5'>
			<h1 className='fs-3'>My Cart</h1>
			{/* cart detail */}

			<h1 className='fs-3'>Review Your Order</h1>
			<hr />
			<div className='d-flex flex-column gap-0'>
				<Row style={{ height: '200px' }}>
					<Col className='overflow-scroll' style={{ height: '300px' }}>
						{cartData?.length === 0 ? (
							<Col className='d-flex flex-column justify-content-center align-items-center'>
								<Image src={cartEmpty} width='200px' />
								<h1>Oooops!!, You have no cart!! :( </h1>
							</Col>
						) : (
							cartData?.map((item) => (
								<Col>
									<Row className='d-flex align-items-center'>
										<Col>
											<Row className='d-flex align-items-center text-start'>
												<Col className='col-3'>
													<Image
														src={item.products.photo}
														style={{
															width: '80px',
															height: '80px',
															objectFit: 'cover',
														}}
													/>
												</Col>
												<Col className='col-9 ps-5 ps-lg-0'>
													<h6 className='my-3 ff-abhaya fw-bold'>
														{item.products.name}
													</h6>
													<h6 className='my-3 ff-avenir'>
														<PrimaryButton
															btnName='-'
															className='m-2'
															onClick={() => {
																handleQtyCart(item.qty, item.id, 'less');
															}}
														/>
														<span className='bg-light border-0 rounded text-dark'>
															{item.qty}
														</span>
														<PrimaryButton
															btnName='+'
															className='m-2'
															onClick={() => {
																handleQtyCart(item.qty, item.id, 'add');
															}}
														/>
													</h6>
												</Col>
											</Row>
										</Col>
										<Col className='col-4 text-start'>
											<h6 className='text-danger my-3'>
												{convertRupiah.convert(item.totalPrice)}
											</h6>
											<h6 className='text-danger my-3'>
												<IoTrash
													style={{ cursor: 'pointer' }}
													onClick={async () => {
														handleDeleteCart(item.id);
													}}
												/>
											</h6>
										</Col>
									</Row>
									<hr />
								</Col>
							))
						)}
					</Col>

					{cartData?.length > 0 && (
						<Col className='col-12 col-lg-4'>
							<Col>
								<Row className='d-flex align-items-center mt-2'>
									<Col>
										<Row className='d-flex align-items-center text-start'>
											<Col className='ff-abhaya'>
												<h6>Subtotal</h6>
												<h6>Qty</h6>
												<h6>Ongkir</h6>
											</Col>
											<Col className='ff-abhaya text-end'>
												<h6>{convertRupiah.convert(subTotal)}</h6>
												<h6>{totalQty}</h6>
												<h6>
													{convertRupiah.convert(10000 * cartData?.length)}
												</h6>
											</Col>
										</Row>
									</Col>
								</Row>
								<hr style={{ marginTop: '30px' }} />
							</Col>

							<Col>
								<Row className='d-flex align-items-center'>
									<Col>
										<Row className='d-flex align-items-center text-start text-danger'>
											<Col className='ff-abhaya'>
												<h6>Total</h6>
											</Col>
											<Col className='col-4 text-end ff-avenir'>
												<h6>
													{convertRupiah.convert(
														subTotal + 10000 * cartData?.length
													)}
												</h6>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
						</Col>
					)}
				</Row>
				{cartData?.length > 0 && (
					<PrimaryButton
						className='w-25 d-flex gap-3 justify-content-center align-self-end mt-5'
						btnName='Pay'
						onClick={() => handlePayCart()}
					></PrimaryButton>
				)}
			</div>
		</Container>
	);
};
