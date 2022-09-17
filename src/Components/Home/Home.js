import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Home = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('login')
        } catch (e) {
            setError(`Failed to Log In ${e.code}`);
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}

export default Home