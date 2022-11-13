import * as React from 'react';
import {
	Col,
	Container,
	FloatingLabel,
	Form,
	Image,
	Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PrimaryInput } from '../../components/atoms/PrimaryInput';

import attachIcon from '../../assets/icons/attach-icon.svg';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { API } from '../../config/api';

export const AddProduct = () => {
	const navigate = useNavigate();
	const formData = new FormData();

	const [thumbnail, setThumbnail] = React.useState(null);

	const [formValue, setFormValue] = React.useState({
		productName: '',
		stock: '',
		price: '',
		description: '',
		photo: '',
	});

	const handleChange = (e) => {
		if (e.target.type == 'file') {
			setFormValue({ ...formValue, photo: e.target.files[0] });
			setThumbnail(URL.createObjectURL(e.target.files[0]));
		} else {
			setFormValue({ ...formValue, [e.target.name]: e.target.value });
		}
	};

	formData.append('productName', formValue.productName);
	formData.append('stock', formValue.stock);
	formData.append('price', formValue.price);
	formData.append('description', formValue.description);
	formData.append('photo', formValue.photo);

	const handleSubmit = async () => {
		try {
			const response = await API.post('/product/create', formData);
			navigate('/admin/products', {
				state: { successMessage: 'Success Add Product' },
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			<h1 className='main-text-color fs-2 mb-5'>Add Product</h1>
			<Row>
				<Col className='col-12 col-lg-8 d-flex flex-column'>
					<Form>
						<PrimaryInput
							label='Name'
							type='text'
							placeholder='name'
							name='productName'
							value={formValue.productName}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryInput
							label='Stock'
							type='number'
							placeholder='stock'
							name='stock'
							value={formValue.stock}
							onChange={(e) => handleChange(e)}
						/>
						<PrimaryInput
							label='Price'
							type='number'
							placeholder='price'
							name='price'
							value={formValue.price}
							onChange={(e) => handleChange(e)}
						/>
						<FloatingLabel controlId='floatingTextarea2' label='Description'>
							<Form.Control
								as='textarea'
								placeholder='Leave a comment here'
								name='description'
								style={{
									height: '100px',
									backgroundColor: '#613D2B40',
									border: '2px solid #613D2B',
								}}
								value={formValue.description}
								onChange={(e) => handleChange(e)}
							/>
						</FloatingLabel>
						<Form.Label
							className='rounded d-flex justify-content-between align-items-center px-2 mt-3'
							htmlFor='photoform'
							style={{
								backgroundColor: '#613D2B40',
								border: '2px solid #613D2B',
								width: '190px',
								height: '50px',
								cursor: 'pointer',
							}}
						>
							Photo Product
							<Image src={attachIcon} />
						</Form.Label>
						<PrimaryInput
							// label='Photo Product'
							type='file'
							placeholder='photo'
							name='photo'
							id='photoform'
							hidden
							value={formValue.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form>
					<PrimaryButton
						btnName='Add Product'
						width='260px'
						className='align-self-center'
						onClick={handleSubmit}
					/>
				</Col>
				<Col
					className='col-12 col-lg-4 bg-secondary p-0'
					style={{ height: '350px' }}
				>
					<Image
						style={{ objectFit: 'fill', height: '100%' }}
						src={thumbnail}
						width='100%'
						className='bg-secondary fs-3 text-center'
						alt='photo product'
					/>
				</Col>
			</Row>
		</Container>
	);
};
