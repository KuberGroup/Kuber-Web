import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertMsg, Copyright, FormButton, Header, LoginContainer, UserCard } from '../../Components'
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
            {/* <LoginContainer>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <AlertMsg variant='danger' text={error} />}
                <strong>Email: </strong>{currentUser.email}
                <p>You are on <strong>{navigator.userAgentData.platform}</strong> device</p>
                <div className="w-100 text-center mt-2">
                    <FormButton onClick={handleLogout}>Log Out</FormButton>
                </div>
            </LoginContainer> */}
            <div className='fl fl-d-col fl-c fl-j-fs w-100 h-100vh'>
                <Header />

                {/* users list */}
                <div className='fl fl-d-col w-100 h-100 m-0' style={{ maxWidth: 480, marginTop: '50px', overflow: 'scroll' }}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <div className='fl fl-c' style={{ background: '#fff', padding: '1.5rem 1rem .5rem' }}>

                        <Copyright />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home