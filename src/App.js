import React from 'react';
import { auth, db } from './firebase';
function App() {
  console.log(auth)
  console.log(db)
  return (
    <div className="App">
      Hola!
    </div>
  );
}

export default App;
