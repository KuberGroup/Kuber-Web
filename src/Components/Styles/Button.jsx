import React from 'react'
import Ripple from './Ripple'
import './Button.css'

export const Button = (props) => {
    const { children } = props
    return (
        <button {...props}>
            {children}
            < Ripple />
        </button >
    )
}
