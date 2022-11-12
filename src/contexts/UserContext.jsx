import * as React from 'react';
import { useQuery } from 'react-query';
import { API } from '../config/api';

export const UserContext = React.createContext();

export const UserProvider = ({ children, value }) => {
	const { data: profile, refetch: refetchProfile } = useQuery(
		'profileCache',
		async () => {
			const response = await API.get('/profile');
			return response.data.data;
		}
	);

	return (
		<UserContext.Provider value={{ profile, refetchProfile }}>
			{children}
		</UserContext.Provider>
	);
};
