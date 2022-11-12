import * as React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export const PrimaryButton = ({
	btnName,
	onClick,
	width,
	outline,
	isLoading,
	...rest
}) => {
	const style = {
		backgroundColor: outline ? 'none' : '#613D2B',
		border: outline ? '2px solid #613D2B' : 'none',
		fontWeight: '700',
		width: width,
		color: outline ? '#613D2B' : '#fff',
	};
	return (
		<Button style={style} variant='none' onClick={onClick} {...rest}>
			{isLoading ? <Spinner animation='border' /> : btnName}
		</Button>
	);
};
