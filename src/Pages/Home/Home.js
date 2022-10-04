import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Copyright, MainContainer, MessageContainer, UserCard } from '../../Components'
import { StartNewChatButton } from '../../Components/Button/Button'
import './Home.scss'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { useChat } from '../../Context/ChatContext'

const Home = () => {
    const { chats, isEmpty, loading } = useChat()
    const navigate = useNavigate()

    const handleStartNewChat = () => {
        navigate('start-new-chat')
    }

    const { id } = useParams()

    if (loading) return (
        <MainContainer logout={true}>
            <div className='fl-c' style={{ fontSize: 32 }}>Loading...</div>
        </MainContainer>
    )

    return (
        <>
            <MainContainer logout={true}>
                <div className='p-rel breakpoint fl fl-c w-100 h-100'>
                    {/* users list */}
                    <div id='home' className='UserContainer p-rel fl fl-c w-100 h-100' style={{ maxWidth: 480 }}>
                        <div className=' p-rel fl fl-d-col w-100 h-100 m-0 fl-j-sb' style={{ maxWidth: 480, overflowY: 'scroll', background: '#fff' }}>
                            <div className='h-100 w-100'>
                                {isEmpty ? <div className='fl fl-c w-100 h-100' style={{ fontSize: 32 }}>
                                    <p className='fl fl-w-w fl-c lhinit p-1 text-center'>
                                        No Chats, click <BiMessageSquareAdd color="#a1a1a1" size={30} style={{ margin: '0 .5rem' }} />
                                        below to start a new chat
                                    </p>
                                </div> :
                                    chats.map((chat) =>
                                        <UserCard
                                            key={chat.id}
                                            id={chat.id}
                                            user={chat}
                                            onClick={() => navigate(`/chat/${chat.id}`)}
                                        />
                                    )}

                            </div>
                            {/* start new chat button */}
                            <div className='fl fl-c' style={{ background: '#fff', padding: '1.5rem 1rem .5rem' }}>
                                <Copyright />
                            </div>
                        </div>
                        <StartNewChatButton onClick={handleStartNewChat} />
                    </div>

                    {/* Messages */}
                    {id ? <MessageContainer chatId={id} /> : <div className='fl fl-c w-100 h-100' style={{ fontSize: 32, background: '#fff' }}>
                        <p className='fl fl-w-w fl-c lhinit p-1 text-center'>
                            Select a chat to start messaging
                        </p>
                    </div>}
                </div>
            </MainContainer>
        </>
    )
}

export default Home