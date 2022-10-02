import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const ChatContext = React.createContext()

export const useChat = () => {
    return useContext(ChatContext)
}

export const ChatProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const { currentUser } = useAuth()

    useEffect(() => {
        if (currentUser) {
            const chatListQuery = query(
                collection(db, 'chatRoom'),
                where('members', 'array-contains', currentUser.uid),
                where('group', '==', false),
                orderBy('recentMessage.sendAt', 'desc')
            )

            const unsubscribe = onSnapshot(chatListQuery, (querySnapshot) => {
                if (querySnapshot.empty) {
                    setIsEmpty(true)
                    setLoading(false)
                }
                else {
                    setIsEmpty(false)
                    setLoading(true)
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
                }
            });

            return unsubscribe
        }
    }, [currentUser])


    const value = {
        chats,
        isEmpty,
        loading
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
