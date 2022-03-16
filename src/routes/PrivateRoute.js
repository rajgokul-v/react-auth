import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { paths } from '../routes/path'

function PrivateRoute({ component: Component, ...rest }) {
	const { isAuthenticated, currentUser } = useAuth()

	return (
		<Route
			{...rest}
			render={(props) => {
				return isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={paths.LOGIN} />
				)
			}}
		/>
	)
}

export default PrivateRoute
