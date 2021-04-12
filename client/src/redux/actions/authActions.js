import axios from 'axios';
import { returnErrors } from './errorActions';

import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADING,
} from '../constants/authConstants';
import { GET_ERRORS } from '../constants/errorConstants';

export const registerUser = user => async dispatch => {
	// Request headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	axios
		.post('/api/auth/register', JSON.stringify(user), config)
		.then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
		.catch(err => {
			dispatch({ type: REGISTER_FAIL });
			dispatch(returnErrors('Register failed', 404));
		});
};

export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });

	const token = localStorage.getItem('authToken');

	if (!token) {
		dispatch(returnErrors('No token', 404));
		return dispatch({ type: AUTH_ERROR });
	}

	dispatch({ type: AUTH_SUCCESS, payload: token });
};
