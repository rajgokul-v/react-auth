import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../../src/contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { paths } from '../../routes/path'

function Signup() {
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { isAuthenticated, Signup, UpdateDisplayName } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [show, setshow] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value)
			return setError('Password not matching')

		if (passwordRef.current.value === '') {
			return setError('Please enter your password')
		}

		if (nameRef.current.value === '') {
			return setError('Please enter your name')
		}

		if (emailRef.current.value === '') {
			return setError('Please enter your email')
		}

		try {
			setError('')
			setIsLoading(true)

			await Signup(emailRef.current.value, passwordRef.current.value)
			await UpdateDisplayName(nameRef.current.value)
			setIsLoading(false)

			history.push(paths.DASHBOARD)
		} catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
	}

	if (isAuthenticated) {
		return <Redirect to={paths.DASHBOARD} />
	}

	return (
		<>
			<Card className="shadow p-3 mb-5 bg-white rounded">
				<Card.Body>
					<h3 className="text-center mb-4">Sign Up</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" ref={nameRef} />
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type={show ? 'text' : 'password'}
								ref={passwordRef}
							/>
							<i
								class={show ? 'bx bx-show' : 'bx bx-hide'}
								onClick={() => setshow(!show)}
							/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type={show ? 'text' : 'password'}
								ref={passwordConfirmRef}
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
				Already have an account? <Link to={paths.LOGIN}>Sign In</Link>
			</div>
		</>
	)
}
export default Signup
