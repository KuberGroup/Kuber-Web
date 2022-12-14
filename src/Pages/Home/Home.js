import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Copyright, MainContainer, MessageContainer, SearchInput, UserCard, SpeedDial } from '../../Components'
import './Home.scss'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { useChat } from '../../Context/ChatContext'

const Home = () => {
    const { chats, isEmpty, loading } = useChat()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const { id } = useParams()

    const filteredUsers = useMemo(() => {
        if (!query) return chats //if no query dont search, return `chats` instead

        return chats.filter(item => {
            return item.displayName.toLowerCase().includes(query.toLowerCase())
        })
    }, [chats, query])

    if (loading) return (
        <MainContainer logout={true}>
            <div className='fl-c' style={{ fontSize: 32 }}>Loading...</div>
        </MainContainer>
    )

    return (
        <>
            <MainContainer logout={true}>
                <div className='fl w-100 h-100 breakpoint'>
                    <div className={`p-rel fl w-100 h-100 child ${id ? 'active' : ''}`} >
                        {/* users list */}
                        <div id='home' className='UserContainer p-rel fl fl-c w-100 h-100'>
                            <div className=' p-rel fl fl-d-col w-100 h-100 m-0 fl-j-sb' style={{ overflowY: 'scroll', background: '#fff' }}>
                                <div className='h-100 w-100'>

                                    {/* search box for filtering users */}
                                    <SearchInput value={query} onChange={e => setQuery(e.target.value)} />

                                    {isEmpty ? <div className='fl fl-c w-100 h-100' style={{ fontSize: 32 }}>
                                        <p className='fl fl-w-w fl-c lhinit p-1 text-center'>
                                            No Chats, click <BiMessageSquareAdd color="#a1a1a1" size={30} style={{ margin: '0 .5rem' }} />
                                            below to start a new chat
                                        </p>
                                    </div> :
                                        filteredUsers.map((chat) =>
                                            (id === chat.id) ? <UserCard
                                                key={chat.id}
                                                id={chat.id}
                                                user={chat}
                                                onClick={() => navigate(`/chat/${chat.id}`)}
                                                className='active'
                                            /> : <UserCard
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
                            <SpeedDial />
                        </div>

                        {/* Messages */}
                        {id ? <MessageContainer chatId={id} /> : <div className='ChatContainer fl fl-c w-100 h-100' style={{ fontSize: 32, background: '#fff' }}>
                            <p className='fl fl-w-w fl-c lhinit p-1 text-center'>
                                Select a chat to start messaging
                            </p>
                        </div>}
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

export default Home