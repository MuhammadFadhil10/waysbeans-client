import { FloatingLabel, Form } from 'react-bootstrap';

export const PrimaryInput = ({ label, ...rest }) => {
	return (
		<Form.Group className='mb-3'>
			<FloatingLabel label={label}>
				<Form.Control
					style={{ backgroundColor: '#613D2B40', border: '2px solid #613D2B' }}
					{...rest}
				></Form.Control>
			</FloatingLabel>
		</Form.Group>
	);
};
