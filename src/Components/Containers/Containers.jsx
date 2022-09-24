import React from 'react'
import { Container } from 'react-bootstrap'
import Copyright from '../Copyright/Copyright'

export const CenterContainer = ({ children, style }) => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={style}>{children}</Container>
    )
}

export const LoginContainer = ({ children }) => {
    return (
        <div style={{
            minHeight: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'
        }}>
            <div></div>
            <div className="w-100" style={{ maxWidth: "420px", padding: '1rem' }}>
                {children}
            </div>

            <Copyright />
        </div>
    );
};