import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertMsg, FormButton, LoginContainer } from '../../Components'
import { useAuth } from '../../Context/AuthContext'

const Home = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('login')
        } catch (e) {
            setError(`Failed to Log In ${e.code}`);
        }
    }
    return (
        <>
            <LoginContainer>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <AlertMsg variant='danger' text={error} />}
                <strong>Email: </strong>{currentUser.email}
                <p>You are on <strong>{navigator.userAgentData.platform}</strong> device</p>
                <div className="w-100 text-center mt-2">
                    <FormButton onClick={handleLogout}>Log Out</FormButton>
                </div>
            </LoginContainer>
        </>
    )
}

export default Home