import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RequireAuth } from './Components/';
import { Home, SignIn, SignUp, VerifyEmail, ForgotPassword, CreateProfile, StartNewChat, NotFound, CreateGroup } from './Pages';
import './Helpers/Spacing.scss'
import { ChatProvider } from './Context/ChatContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ChatProvider>
            <Routes>
              {/* Routes which require Login */}
              <Route exact path='/' element={<RequireAuth><Home /></RequireAuth>} />
              <Route exact path='/chat' element={<RequireAuth><Home /></RequireAuth>}>
                <Route exact path=':id' element={<RequireAuth><Home /></RequireAuth>} />
              </Route>
              <Route exact path='/create-profile' element={<RequireAuth><CreateProfile /></RequireAuth>} />
              <Route exact path='/start-new-chat' element={<RequireAuth><StartNewChat /></RequireAuth>} >
                <Route exact path=':id' element={<RequireAuth><StartNewChat /></RequireAuth>} />
              </Route>
              <Route exact path='/create-group' element={<RequireAuth><CreateGroup /></RequireAuth>} />
              {/* Routes which require Login */}

              <Route path='/verify-email' element={<VerifyEmail />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />

              {/* Default NO_PAGE */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
