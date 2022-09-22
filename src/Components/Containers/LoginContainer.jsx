import React from 'react'
import CenterContainer from './CenterContainer'

const LoginContainer = ({ children }) => {
    return (
        <CenterContainer
            style={{ minHeight: '100vh' }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>{children}</div>
        </CenterContainer>
    )
}

export default LoginContainer