import './App.css';
import { useAuth } from './context/AuthContext';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';


function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null
  return (
    isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
  );
}

export default App
