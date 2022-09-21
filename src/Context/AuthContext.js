import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const sendVerificationEmail = () => {
        sendEmailVerification(auth.currentUser).then(() => {
            const onIdTokenChangedUnsubscribe = auth.onIdTokenChanged(user => {
                const unsubscribeSetInterval = setTimeout(() => {
                    auth.currentUser.reload();
                    auth.currentUser.getIdToken(/* forceRefresh */ true);
                }, 1000);

                if (user && user.emailVerified) {
                    clearInterval(unsubscribeSetInterval); //delete interval
                    // -> Go to your screnn
                    // extra safety to get latest user details
                    auth.currentUser.reload();
                    setCurrentUser(auth.currentUser);
                    setLoading(false);
                    return onIdTokenChangedUnsubscribe(); //unsubscribe onIdTokenChanged
                }
            });
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        sendVerificationEmail
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
