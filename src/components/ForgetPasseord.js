import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Forgetpassword() {
	const emailRef = useRef()
	const { resetPassword } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setMessage('')
			setError('')
			setIsLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage('check your inbox for further instruction')

			setIsLoading(false)
		} catch (error) {
			setError('Failed to reset password')
		}
		setIsLoading(false)
	}
	return (
		<>
			<Card>
				<Card.Body>
					<h3 className="text-center mb-4">Password reset</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button className="w-100 mt-3" type="submit" disabled={isLoading}>
							{isLoading ? 'Reseting...' : 'Reset'}
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/signin">Sign In</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	)
}
