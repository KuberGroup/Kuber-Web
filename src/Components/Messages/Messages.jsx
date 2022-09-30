import React from 'react'

export const LeftMessage = () => {
    return (
        <div className='message w-100 fl' style={{ padding: '.2rem .4rem' }}>
            <div className='left' style={{
                background: '#eee',
                padding: '.5rem 1rem',
                borderRadius: '10px 10px 10px 0',
                color: '#111',
                maxWidth: 'calc(100% - 100px)'
            }}>left message</div>
        </div>
    )
}

export const RightMessage = () => {
    return (
        <div className='message w-100 fl fl-j-fe' style={{ padding: '.2rem .4rem' }}>
            <div className='right' style={{
                background: '#9c27b0',
                padding: '.5rem 1rem',
                borderRadius: '10px 10px 0 10px',
                color: '#fff',
                maxWidth: 'calc(100% - 100px)'
            }}>Right Message</div>
        </div>
    )
}