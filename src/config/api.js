import * as React from 'react';

import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://waysbeans-rest.herokuapp.com/api/v1',
});

export const setAuthToken = (token) => {
	if (token != '') {
		console.log(token);
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
