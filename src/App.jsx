import './App.css'
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App
