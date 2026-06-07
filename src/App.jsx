import './App.css';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';
import LoadingScreen from './components/common/LoadingScreen';


function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Toaster position="bottom-right" richColors />
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>

  );
}

export default App
