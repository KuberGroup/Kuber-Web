import React from 'react'

export const UserCard = () => {
    return (
        <div className='fl' style={{ background: '#fff', padding: '.5rem 1rem' }}>
            <div className='user-pic c-p' style={{ width: 50, height: 50, borderRadius: '50%', background: '#eee' }}></div>
            <div className='user-data fl pl-1 c-p' style={{ width: 'calc(100% - 50px)' }}>
                <div className='name-data w-100 fl fl-d-col fl-j-se lhinit h-100 ellipsis'>
                    <div className='name-item ellipsis'>Username</div>
                    <div className='message-item ellipsis' style={{ fontSize: 14, color: '#ccc' }}>hello this is message</div>
                </div>
                <div className='timestamp fl fl-c' style={{ width: 80, fontSize: 10, color: '#ccc' }}>10:03 AM</div>
            </div>
        </div>
    )
}
