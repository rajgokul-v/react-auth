import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signin() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { Signin, currentUser, Signout } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError('')
			setIsLoading(true)

			await Signin(emailRef.current.value, passwordRef.current.value)

			setIsLoading(false)
		} catch (error) {
			if (error.code === 'auth/wrong-password')
				setError('Incorrect email or password')

			setIsLoading(false)
		}
	}

	async function handleSignout(e) {
		e.preventDefault()

		await Signout()
		localStorage.removeItem('user')
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{currentUser && (
						<Alert variant="primary">
							{currentUser.displayName}
							<Button className="ml-5" onClick={handleSignout}>
								Signout
							</Button>
						</Alert>
					)}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button className="w-100" type="submit" disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Signin'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/Signup">Sign Up</Link>
			</div>
		</>
	)
}
