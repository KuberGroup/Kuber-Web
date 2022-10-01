import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copyright, FormInput, LeftMessage, MainContainer, RightMessage, UserCard } from '../../Components'
import { StartNewChatButton } from '../../Components/Button/Button'
import { useAuth } from '../../Context/AuthContext'
import { db } from '../../firebase'
import './Home.scss'
const Home = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    const handleStartNewChat = () => {
        navigate('start-new-chat')
    }

    useEffect(() => {
        const chatListQuery = query(
            collection(db, 'chatRoom'),
            where('members', 'array-contains', currentUser.uid),
            where('group', '==', false),
            orderBy('recentMessage.sendAt', 'desc')
        )

        const unsubscribe = onSnapshot(chatListQuery, (querySnapshot) => {
            const queryPromises = querySnapshot.docs.map((item) => {
                return new Promise((resolve, reject) => {
                    const temp = [];
                    const freindId = item.data().members.filter((member) => member !== currentUser.uid);
                    getDoc(doc(db, 'users', freindId[0])).then((snapshot) => {
                        temp.push(snapshot.data().displayName);
                        temp.push(snapshot.data().photoURL);
                        resolve({
                            ...item.data(), id: item.id, displayName: temp[0], photoURL: temp[1],
                        })
                    })
                })
            })
            Promise
                .all(queryPromises)
                .then(chatsData => {
                    setChats(chatsData)
                })
                .finally(() => {
                    setLoading(false)
                })
        });

        return () => unsubscribe()
    }, [currentUser.uid])

    if (loading) {
        return <MainContainer logout={true}><div className='fl-c' style={{ fontSize: 32 }}>Loading...</div></MainContainer>
    }
    return (
        <>
            <MainContainer logout={true}>
                <div className='p-rel breakpoint fl fl-c w-100 h-100'>
                    {/* users list */}
                    <div id='home' className='UserContainer p-rel fl fl-c w-100 h-100' style={{ maxWidth: 480 }}>
                        <div className=' p-rel fl fl-d-col w-100 h-100 m-0' style={{ maxWidth: 480, overflowY: 'scroll' }}>
                            {chats.map((chat, index) =>
                                <UserCard
                                    key={index}
                                    id={chat.id}
                                    user={chat}
                                />
                            )}
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