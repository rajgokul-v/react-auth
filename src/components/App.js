import React from 'react'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import ForgetPasseord from './pages/ForgetPasseord'
import Questions from './pages/Questions'
import PrivateRoute from '../routes/PrivateRoute'
import Header from './Header'
import PermissionDeniedPage from './pages/PermissionDenied'
import HomePage from './pages/HomePage'

import { paths } from '../routes/path'
import UpdateProfile from '../components/pages/UpdateProfile'

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Header />
					<Container
						className="d-flex align-items-center justify-content-center"
						style={{ minHeight: '100vh' }}
					>
						<div className="w-100" style={{ maxWidth: '400px' }}>
							<Switch>
								<PrivateRoute
									exact
									path={paths.DASHBOARD}
									component={Dashboard}
									role="admin"
								/>
								<PrivateRoute
									path={paths.UPDATE_PROFILE}
									component={UpdateProfile}
								/>
								<PrivateRoute path={paths.QUESTION} component={Questions} />
								<Route path={paths.REGISTER} component={Signup} />
								<Route path={paths.LOGIN} component={SignIn} />
								<Route path={paths.HOME} component={HomePage} />
								<Route
									path={paths.FORGET_PASSWORD}
									component={ForgetPasseord}
								/>
								<PrivateRoute
									path={paths.PERMISSION_DENIED}
									component={PermissionDeniedPage}
								/>
								<Route path="*" component={PageNotFound} />
							</Switch>
						</div>
					</Container>
				</AuthProvider>
			</Router>
		</>
	)
}

export default App
