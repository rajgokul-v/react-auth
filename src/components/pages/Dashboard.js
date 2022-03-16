import React, { useState, useRef } from 'react'
import { Form, Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import Loader from '../Loader'
import { paths } from '../../routes/path'

export default function Dashboard() {
	const { currentUser, Signout, UpdateDisplayName } = useAuth()
	const nameRef = useRef()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const history = useHistory()

	async function handleSignout(e) {
		localStorage.removeItem('user')
		await Signout()
		return history.push(paths.LOGIN)
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

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className="shadow p-3 mb-5 bg-white rounded">
					<Card.Body>
						<h3 className="text-center mb-4">Profile</h3>
						<div className="jumbotron text-center mb-9">
							<span>
								Welcome <b>{currentUser?.displayName}</b>
							</span>
							<br />
							<span>
								<b>{currentUser?.email}</b>
							</span>
						</div>
						<Link
							to={paths.UPDATE_PROFILE}
							className=" w-100 text-center mt-2  align-iems-center btn btn-primary active "
						>
							Update profile
						</Link>
					</Card.Body>
				</Card>
			)}

			<div className="w-100 text-center mt-2">
				<Button onClick={handleSignout}>Log out</Button>
			</div>
		</>
	)
}
