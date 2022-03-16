import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../src/contexts/AuthContext'

import { paths } from '../../routes/path'
import Loader from '../Loader'

export default function SignIn() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { isAuthenticated, Signin } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [show, setshow] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value === '') {
			return setError('Please enter your password')
		}

		if (emailRef.current.value === '') {
			return setError('Please enter your email')
		}

		try {
			setError('')
			setIsLoading(true)

			await Signin(emailRef.current.value, passwordRef.current.value)
			setIsLoading(false)

			history.push(paths.DASHBOARD)
		} catch (error) {
			if (error.code === 'auth/wrong-password')
				setError('Incorrect email or password')
			else if (error.code === 'auth/user-not-found') setError('User not found')

			setIsLoading(false)
		}
	}

	if (isAuthenticated) {
		history.push(paths.DASHBOARD)
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className="shadow p-3 mb-5 bg-white rounded">
					<Card.Body>
						<h3 className="text-center mb-4">Sign In</h3>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									ref={emailRef}
									onChange={() => setError('')}
								/>
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={show ? 'text' : 'password'}
									ref={passwordRef}
									onChange={() => setError('')}
								/>
								<i
									class={show ? 'bx bx-show' : 'bx bx-hide'}
									onClick={() => setshow(!show)}
								/>
							</Form.Group>
							<Button className="w-100 mt-3" type="submit" disabled={isLoading}>
								{isLoading ? 'Signing In...' : 'Sign In'}
							</Button>
						</Form>
						<div className="w-100 text-center mt-3">
							<Link to={paths.FORGET_PASSWORD}>Forget Password?</Link>
						</div>
					</Card.Body>
				</Card>
			)}

			{!isLoading && (
				<div className="w-100 text-center mt-2">
					Need an account? <Link to={paths.REGISTER}>Sign Up</Link>
				</div>
			)}
		</>
	)
}
