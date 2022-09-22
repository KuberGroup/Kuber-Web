import React from 'react'
import { Container } from 'react-bootstrap'

const CenterContainer = ({ children, style }) => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={style}>{children}</Container>
    )
}

export default CenterContainer