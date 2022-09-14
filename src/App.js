import React from 'react';
import { Container } from 'react-bootstrap';
// import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Container className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}>
          <div className='w-100' style={{ maxWidth: '400px' }}>
            <SignUp />
            {/* <LogIn /> */}
          </div>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
