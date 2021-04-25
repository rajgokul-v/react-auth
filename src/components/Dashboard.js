import React, { useState, useRef } from 'react'
import { Form, Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

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
					<h3 className="text-center mb-4">Profile</h3>
					<div className="jumbotron text-center mb-9">
						<span>
							Welcome{' '}
							<b>{currentUser?.displayName || currentUser?.email || 'Guest'}</b>
						</span>
					</div>
					<Link
						to="/update-profile"
						className=" w-100 text-center mt-2  align-iems-center btn btn-primary active "
					>
						Update profile
					</Link>

					{!currentUser?.displayName && (
						<div className="mt-5">
							<h3 className="text-center mb-4">Profile</h3>
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
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleSignout}>
					Log out
				</Button>
			</div>
		</>
	)
}
