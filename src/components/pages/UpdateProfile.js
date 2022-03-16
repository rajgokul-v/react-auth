import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { paths } from '../../routes/path'

export default function UpdateProfile() {
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { currentUser, UpdateDisplayName } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [show, setshow] = useState(false)
	const history = useHistory()

	function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value === '')
			return setError('please enter your password')

		const promises = []
		setIsLoading(true)
		setError('')
		if (nameRef.current.value !== currentUser?.name) {
			promises.push(UpdateDisplayName(nameRef.current.value))
		}
		Promise.all(promises)
			.then(() => {
				history.push(paths.DASHBOARD)
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
								defaultValue={currentUser?.name}
							/>
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								defaultValue={currentUser?.email}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type={show ? 'password' : 'text'}
								ref={passwordRef}
								placeholder="Leave blank to keep the same "
							/>
							<i
								class={show ? 'bx bx-hide' : 'bx bx-show'}
								onClick={() => setshow(!show)}
							/>
						</Form.Group>
						<Button
							className="w-100 mt-3 mb-3"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Updating...' : 'update'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	)
}
