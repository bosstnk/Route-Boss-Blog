import './App.css'
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";


function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" richColors />
    </div>
    </>
  );
}

export default App
