import React, { useState, useRef } from 'react'
import { Form, Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
	const { currentUser, Signout, UpdateDisplayName } = useAuth()
	const nameRef = useRef()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const history = useHistory()

	async function handleSignout(e) {
		e.preventDefault()

		await Signout()
		localStorage.removeItem('user')
		history.push('/signin')
	}

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError('')
			setIsLoading(true)

			await UpdateDisplayName(nameRef.current.value)

			setIsLoading(false)
		} catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
	}

	if (!currentUser) history.push('/signin')

	return (
		<>
			<Card>
				<Card.Body>
					<div className="d-flex justify-content-between align-items-center">
						<span>
							Welcome{' '}
							<b>{currentUser?.displayName || currentUser?.email || 'Guest'}</b>
						</span>

						<Button onClick={handleSignout}>Signout</Button>
					</div>

					{!currentUser?.displayName && (
						<div className="mt-5">
							{error && <Alert variant="danger">{error}</Alert>}
							<Form onSubmit={handleSubmit}>
								<Form.Group id="name">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" ref={nameRef} required />
								</Form.Group>
								<Button
									className="w-100 mt-3"
									type="submit"
									disabled={isLoading}
								>
									{isLoading ? 'Updating name...' : 'Update Name'}
								</Button>
							</Form>
						</div>
					)}
				</Card.Body>
			</Card>
		</>
	)
}
