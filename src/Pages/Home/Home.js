import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertMsg, Copyright, FormButton, Header, LoginContainer, UserCard } from '../../Components'
import { StartNewChatButton } from '../../Components/Button/Button'
import { useAuth } from '../../Context/AuthContext'
// import { handleStartNewChat } from '../../Helpers/RouteHandlers'

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

    const handleStartNewChat = () => {
        console.log('hi')
        navigate('start-new-chat')
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
                <div className='p-rel w-100 h-100vh' style={{ maxWidth: 480 }}>
                    <div className=' p-rel fl fl-d-col w-100 h-100vh m-0' style={{ maxWidth: 480, marginTop: '50px', overflow: 'scroll' }}>
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
                        {/* start new chat button */}
                        <div className='fl fl-c' style={{ background: '#fff', padding: '1.5rem 1rem .5rem' }}>

                            <Copyright />
                        </div>
                    </div>
                    <StartNewChatButton onClick={handleStartNewChat} />
                </div>
            </div>
        </>
    )
}

export default Home