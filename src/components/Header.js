import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { paths } from '../routes/path'

const Header = ({ location }) => {
	const { isAuthenticated } = useAuth()
	console.log(location)
	return (
		<Navbar className="nav" bg="primary" variant="dark" expand="lg">
			<div>
				<Link className="logo" to={paths.HOME}>
					CodeSpace
				</Link>
			</div>
			<ul>
				<li>
					{!isAuthenticated ? (
						<a href={paths.LOGIN}>Sign in</a>
					) : (
						<a href={paths.QUESTION}>Questions</a>
					)}{' '}
				</li>
				<li>
					{!isAuthenticated ? (
						<a href={paths.REGISTER}>Sign up</a>
					) : (
						<a href={paths.SERVICE}>Service</a>
					)}
				</li>
			</ul>
		</Navbar>
	)
}

export default Header
