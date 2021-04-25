import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const {
		currentUser,
		UpdateEmail,
		UpdatePassword,
		UpdateDisplayName
	} = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const history = useHistory()

	function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value !== passwordConfirmRef.current.value)
			return setError('Password not matching')

		const promises = []
		setIsLoading(true)
		setError('')
		if (nameRef.current.value !== currentUser.name) {
			promises.push(UpdateDisplayName(nameRef.current.value))
		}
		if (emailRef.current.value !== currentUser.email) {
			promises.push(UpdateEmail(emailRef.current.value))
		}
		if (passwordRef.current.value) {
			promises.push(UpdatePassword(passwordRef.current.value))
		}
		promises
			.all(promises)
			.then(() => {
				history.push('/')
			})
			.catch(() => {
				setError('Failed to update account')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h3 className="text-center mb-4">Update Profile</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								ref={nameRef}
								defaultValue={currentUser.name}
							/>
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Leave blank to keep the same "
							/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								placeholder="Leave blank to keep the same "
								required
							/>
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
