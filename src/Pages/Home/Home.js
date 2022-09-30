import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Copyright, FormInput, LeftMessage, MainContainer, RightMessage, UserCard } from '../../Components'
import { StartNewChatButton } from '../../Components/Button/Button'
import './Home.scss'
const Home = () => {
    const navigate = useNavigate()

    const handleStartNewChat = () => {
        navigate('start-new-chat')
    }

    return (
        <>
            <MainContainer logout={true}>
                <div className='p-rel breakpoint fl fl-c w-100 h-100'>
                    {/* users list */}
                    <div id='home' className='UserContainer p-rel fl fl-c w-100 h-100' style={{ maxWidth: 480 }}>
                        <div className=' p-rel fl fl-d-col w-100 h-100 m-0' style={{ maxWidth: 480, overflowY: 'scroll' }}>
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

                    {/* Messages */}
                    <div className='ChatContainer p-rel fl fl-d-col w-100 h-100 m-0' style={{ background: '#fff' }}>
                        <div className='fl' style={{ height: 45 }}>Username</div>
                        <div className='fl fl-d-col h-100' style={{ overflow: 'scroll' }}>
                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                            <LeftMessage />
                            <RightMessage />

                        </div>
                        <div className='w-100'>
                            <FormInput label='Write Message Here.' className='w-100' />
                        </div>
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

export default Home