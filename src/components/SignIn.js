import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SignIn() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { Signin } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError('')
			setIsLoading(true)

			await Signin(emailRef.current.value, passwordRef.current.value)
			setIsLoading(false)

			history.push('/')
		} catch (error) {
			if (error.code === 'auth/wrong-password')
				setError('Incorrect email or password')
			else if (error.code === 'auth/user-not-found') setError('User not found')

			setIsLoading(false)
		}
	}

	return (
		<>
			<Card className="shadow p-3 mb-5 bg-white rounded">
				<Card.Body>
					<h3 className="text-center mb-4">Sign In</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button className="w-100 mt-3" type="submit" disabled={isLoading}>
							{isLoading ? 'Signing In...' : 'Sign In'}
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/forget-password">Forget Password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	)
}
