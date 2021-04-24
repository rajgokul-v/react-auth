import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Signup() {
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { Signup, UpdateDisplayName, currentUser } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value)
			return setError('Password not matching')

		try {
			setError('')
			setIsLoading(true)

			await Signup(emailRef.current.value, passwordRef.current.value)
			await UpdateDisplayName(nameRef.current.value)
			history.push('/')

			setIsLoading(false)
		} catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
	}

	if (currentUser && !isLoading) history.push('/')

	return (
		<>
			<Card>
				<Card.Body>
					<h3 className="text-center mb-4">Sign Up</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" ref={nameRef} required />
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button
							className="w-100 mt-3 mb-3"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Signing up...' : 'Sign Up'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/signin">Sign In</Link>
			</div>
		</>
	)
}
export default Signup
