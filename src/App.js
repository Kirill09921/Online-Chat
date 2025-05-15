import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegForm from './components/RegForm';
import ChatPage from './components/ChatPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated ? (
        <ChatPage />
      ) : (
        <RegForm onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;

