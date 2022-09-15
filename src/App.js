import React from 'react';
import { Container } from 'react-bootstrap';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
function App() {
  return (
    <div className="App">
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Routes>

                {/* Routes which require Login */}

                <Route exact path='/' element={<Home />} />

                {/* Routes which require Login */}


                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<LogIn />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
