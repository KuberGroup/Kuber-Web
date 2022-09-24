import React from 'react'
import { BiLock } from 'react-icons/bi'
import { CenterContainer } from '..'

export const AuthHeader = ({ children }) => {
    return (

        <CenterContainer style={{
            marginBottom: '1rem'
        }}>
            <span className='p-rel fl fl-c m-1' style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                borderRadius: '50%',
                userSelect: 'none',
                backgroundColor: '#9c27b0',
            }}>
                <BiLock color='#fff' />
            </span>

            <h1 className="text-center" style={{
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.334,
                letterSpacing: '0em',
                color: '#101010',
            }}>{children}</h1>
        </CenterContainer>
    )
}