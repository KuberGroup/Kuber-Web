import React from 'react'
import Copyright from '../Copyright/Copyright'

export const CenterContainer = ({ children, style }) => {
    return (
        <div className='fl fl-c' style={style}>{children}</div>
    )
}

export const LoginContainer = ({ children }) => {
    return (
        <div className='fl fl-d-col fl-c fl-j-sa' style={{
            minHeight: "100vh",
        }}>
            <div></div>
            <div className="w-100 p-1" style={{ maxWidth: "420px" }}>
                {children}
            </div>

            <Copyright />
        </div>
    );
};