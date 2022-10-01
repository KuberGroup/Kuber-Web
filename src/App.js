import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RequireAuth } from './Components/';
import { Home, SignIn, SignUp, VerifyEmail, ForgotPassword, CreateProfile, StartNewChat } from './Pages';
import './Helpers/Spacing.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            {/* Routes which require Login */}
            <Route exact path='/' element={<RequireAuth><Home /></RequireAuth>} />
            <Route exact path='/create-profile' element={<RequireAuth><CreateProfile /></RequireAuth>} />
            <Route exact path='/start-new-chat' element={<RequireAuth><StartNewChat /></RequireAuth>} />
            <Route path='/verify-email' element={<RequireAuth><VerifyEmail /></RequireAuth>} />
            {/* Routes which require Login */}


            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
