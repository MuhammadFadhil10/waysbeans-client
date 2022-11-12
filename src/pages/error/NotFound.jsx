import * as React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

import './NotFound.css';

export const NotFound = () => {
    const navigate = useNavigate()
	return (
		<Container className='box'>
            <div>
                <h1>OOOPS! LOOK LIKE YOU GOT LOST :(</h1>
            </div>
			<div className='grid'>
				<div className='grid__row'>
					<div className='grid__col'>
						<div className='box animation animation--shake--vertical'>4</div>
					</div>

					<div className='grid__col'>
						<div className='box animation animation--reverse animation--shake--vertical'>
							0
						</div>
					</div>

					<div className='grid__col'>
						<div className='box animation animation--shake--vertical'>4</div>
					</div>
				</div>
			</div>
            <div>
                <PrimaryButton btnName='Go Home' onClick={() => navigate('/')} />
            </div>
		</Container>
	);
};
