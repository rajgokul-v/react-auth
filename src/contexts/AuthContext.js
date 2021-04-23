import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()

	// Signup a new user
	function Signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	function Signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function Signout() {
		return auth.signOut()
	}

	function UpdateDisplayName(name) {
		return auth.currentUser.updateProfile({ displayName: name })
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)

			localStorage.setItem('user', {
				email: currentUser.email,
				displayName: currentUser.displayName
			})
		})
		return unsubscribe
	}, [])

	const value = {
		currentUser,
		Signup,
		Signin,
		Signout,
		UpdateDisplayName
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
