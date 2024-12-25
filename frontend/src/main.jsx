import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { SocketContextProvider } from './contexts/SocketContext.jsx';
import { RepostProvider } from './contexts/RepostContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <SocketContextProvider>
          <RepostProvider>
            <App />
          </RepostProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>
);