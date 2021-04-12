import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from '../constants/authConstants';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload,
			};

		case AUTH_SUCCESS:
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('authToken', action.payload.token);
			return {
				...state,
				...action.payload,
				isLoading: false,
				isAuthenticated: true,
			};

		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			localStorage.removeItem('authToken');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				isLoading: false,
			};

		default:
			return state;
	}
}
