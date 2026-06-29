import './App.css';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnauthenticatedApp from './app/UnauthenticatedApp';


function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Toaster position="bottom-right" richColors />
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}

export default App
