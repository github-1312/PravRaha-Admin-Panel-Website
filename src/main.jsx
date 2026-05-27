import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './services/auth.context.jsx';
import SocketProvider from './services/socket.context.jsx';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>


        <App />

      </SocketProvider>
    </AuthProvider>
  </StrictMode>
);