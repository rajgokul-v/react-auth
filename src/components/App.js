import React from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import PageNotFound from './PageNotFound'
import ForgetPasseord from './ForgetPasseord'
import UpdateProfile from './UpdateProfile'
import PrivateRoute from './PrivateRoute'

function App() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: '100vh' }}
		>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard} role="admin" />
							<PrivateRoute path="/update-profile" component={UpdateProfile} />
							<Route path="/signup" component={Signup} />
							<Route path="/signin" component={SignIn} />
							<Route path="/forget-password" component={ForgetPasseord} />
							<Route path="*" component={PageNotFound} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	)
}

export default App
