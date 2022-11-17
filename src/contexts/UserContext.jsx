import * as React from 'react';
import { useQuery } from 'react-query';
import { API } from '../config/api';

export const UserContext = React.createContext();

export const UserProvider = ({ children, value }) => {
	const [profile, setProfile] = React.useState(null);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
