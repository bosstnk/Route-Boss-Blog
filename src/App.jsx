import './App.css'
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import MemberManagementPage from './pages/MemberManagementPage';


function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/member" element={<MemberManagementPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" richColors />
    </div>
    </>
  );
}

export default App
