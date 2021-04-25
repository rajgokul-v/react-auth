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
		localStorage.removeItem('name')
		localStorage.removeItem('email')
		return auth.signOut()
	}

	function UpdateDisplayName(name) {
		localStorage.setItem('name', name)
		return auth.currentUser.updateProfile({ displayName: name })
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)

			if (user?.displayName) localStorage.setItem('name', user.displayName)
			if (user?.email) localStorage.setItem('email', user.email)
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
