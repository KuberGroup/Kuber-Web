import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Copyright, MainContainer, UserCard } from '../../Components'
import { StartNewChatButton } from '../../Components/Button/Button'

const Home = () => {
    const navigate = useNavigate()

    const handleStartNewChat = () => {
        navigate('start-new-chat')
    }

    return (
        <>
            <MainContainer logout={true}>
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
            </MainContainer>
        </>
    )
}

export default Home