import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { paths } from '../../routes/path'

const HomePage = () => {
	const { isAuthenticated } = useAuth()
	return (
		<div>
			{isAuthenticated ? (
				<div>
					You are <strong> logged in</strong>. You can access all routes now!
					<br />
					<br /> If you try navigating to <Link to={paths.LOGIN}>
						Login
					</Link> or <Link to={paths.REGISTER}>Register</Link> page, you will be
					redirected to home page.
				</div>
			) : (
				<div>
					You are <strong>not logged in</strong>. You can only access public
					routes for now!
					<br />
					<br /> If you try navigating to a{' '}
					<Link to={paths.DASHBOARD}>Protected Page</Link>, you will be
					redirected to login page.
				</div>
			)}
		</div>
	)
}

export default HomePage
