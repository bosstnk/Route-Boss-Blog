import './App.css';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';


function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Toaster position="bottom-right" richColors />
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>

  );
}

export default App
