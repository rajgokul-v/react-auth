import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState()
	const [currentUser, setCurrentUser] = useState()
	useEffect(() => {
		const _user = JSON.parse(localStorage.getItem('user'))
		setIsAuthenticated(_user ? true : false)
	})
	// Signup a new user
	function Signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	function Signin(email, password) {
		setIsAuthenticated('true')
		return auth.signInWithEmailAndPassword(email, password)
	}

	function Signout() {
		localStorage.removeItem('user')
		setIsAuthenticated('false')
		return auth.signOut()
	}

	function UpdateDisplayName(name) {
		return auth.currentUser.updateProfile({ displayName: name })
	}

	function UpdateEmail(email) {
		return auth.currentUser.updateEmail(email)
	}
	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)

			if (user) localStorage.setItem('user', JSON.stringify(user))
		})
		return unsubscribe
	}, [])

	const value = {
		currentUser,
		isAuthenticated,
		Signup,
		Signin,
		Signout,
		UpdateDisplayName,
		UpdateEmail,
		resetPassword
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
