import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { Signup } = useAuth()
	const [user, setUser] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value)
			return setError('Password not matching')

		try {
			setError('')
			setIsLoading(true)
			let res = await Signup(emailRef.current.value, passwordRef.current.value)
			setUser(res.user)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setError(error.message)
			setIsLoading(false)
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Signup</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{user && <Alert variant="primary">{user.email}</Alert>}
					<Form onSubmit={handleSubmit}>
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
						<Button className="w-100" type="submit" disabled={isLoading}>
							{isLoading ? 'Signing up...' : 'Signup'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<a href="">Already have an account?</a>
			</div>
		</>
	)
}
export default Signup
