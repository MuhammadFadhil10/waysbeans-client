import * as React from 'react';
import { useQuery } from 'react-query';
import { API } from '../config/api';

export const UserContext = React.createContext();

export const UserProvider = ({ children, value }) => {
	const [profile, setProfile] = React.useState(null);
	const refetchProfile = async () => {
		const response = await API.get('/profile');
		setProfile(response.data.data);
	};

	return (
		<UserContext.Provider value={{ profile, refetchProfile, setProfile }}>
			{children}
		</UserContext.Provider>
	);
};
