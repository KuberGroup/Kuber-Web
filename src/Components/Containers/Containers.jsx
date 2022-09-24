import React from 'react'
import Copyright from '../Copyright/Copyright'

export const CenterContainer = ({ children, style }) => {
    const primaryStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={{ ...primaryStyle, ...style }}>{children}</div>
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