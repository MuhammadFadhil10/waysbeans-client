import * as React from 'react';
import { Button } from 'react-bootstrap';

export const PrimaryButton = ({ btnName, onClick, width }) => {
	const style = {
		backgroundColor: '#613D2B',
		border: 'none',
		fontWeight: '700',
		fontSize: '18px',
		width: width,

		// letterSpacing: '2px',
	};
	return (
		<Button style={style} onClick={onClick}>
			{btnName}
		</Button>
	);
};
