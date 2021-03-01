import React from 'react';
import GlobalContextProvider from './context/GlobalContext';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import Finalize from './components/Finalize/Finalize';
import Results from './components/Results/Results';

// GlobalContextProvider serves state and dispatch like redux does
function App(): JSX.Element {
	return (
		<GlobalContextProvider>
			<Switch>
				<Route exact path='/dashboard'>
					<Dashboard />
				</Route>
				<Route exact path='/results/:testId'>
					<Results />
				</Route>
				<Route exact path='/finalize/:testId'>
					<Finalize />
				</Route> 
				<Redirect to='/dashboard'/>
			</Switch>
		</GlobalContextProvider>
	);
}

export default withRouter(App);