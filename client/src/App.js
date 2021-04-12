import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import loadUser from './redux/actions/authActions';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Home from './components/Home/Home';
import Header from './components/Header/Header';

function App() {
	const history = useHistory();

	useEffect(() => {
		dispatchEvent(loadUser());
	}, []);
	return (
		<div className="app">
			<Header />
			<Switch>
				<PrivateRoute exact path="/profile" component={Profile} />
				<Route exact path="/" component={Home} />
				<Route
					path="/auth/register"
					component={Register}
					history={history}
				/>
				<Route path="/auth/login" component={Login} history={history} />
			</Switch>
		</div>
	);
}

export default App;
