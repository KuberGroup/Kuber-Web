import React from 'react'
import { BiLock } from 'react-icons/bi'
import CenterContainer from '../Containers/CenterContainer'

const AuthHeader = ({ children }) => {
    return (

        <CenterContainer style={{
            marginBottom: '1rem'
        }}>
            <span style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                borderRadius: '50%',
                userSelect: 'none',
                backgroundColor: '#9c27b0',
                margin: '.5rem'
            }}>
                <BiLock color='#fff' />
            </span>

            <h1 className="text-center" style={{
                margin: 0,
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.334,
                letterSpacing: '0em'
            }}>{children}</h1>
        </CenterContainer>
    )
}

export default AuthHeader