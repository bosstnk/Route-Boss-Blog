import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import MemberProfilePage from './pages/MemberProfilePage';
import MemberResetPasswordPage from './pages/MemberResetPasswordPage';
import AdminLogInPage from './pages/admin/AdminLogInPage';
import ArticleManagmentPage from './pages/admin/ArticleManagementPage';
import AdminCreateArticlePage from './pages/admin/AdminCreateArticlePage';
import AdminEditArticlePage from './pages/admin/AdminEditArticlePage';
import AdminCategoryManagementPage from './pages/admin/AdminCategoryManagementPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminResetPasswordPage from './pages/admin/AdminResetPasswordPage';
import AdminNotificationPage from './pages/admin/AdminNotificationPage';
import AdminCreateCategoryPage from './pages/admin/AdminCreateCategoryPage';
import AdminEditCategoryPage from './pages/admin/AdminEditCategoryPage';
import SignUpSuccessPage from './pages/SignUpPageSuccess';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<ViewPostPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signup-success" element={<SignUpSuccessPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/member-profile" element={<MemberProfilePage />} />
            <Route path="/member-reset-password" element={<MemberResetPasswordPage />} />
            <Route path="/admin/login" element={<AdminLogInPage />} />

            {/* Admin Section */}
            <Route path="/admin/article-management" element={<ArticleManagmentPage />} />
            <Route
              path="/admin/article-management/create"
              element={<AdminCreateArticlePage />}
            />
            <Route
              path="/admin/article-management/edit/:postId"
              element={<AdminEditArticlePage />}
            />
            <Route
              path="/admin/category-management"
              element={<AdminCategoryManagementPage />}
            />
            <Route
              path="/admin/category-management/create"
              element={<AdminCreateCategoryPage />}
            />
            <Route
              path="/admin/category-management/edit/:categoryId"
              element={<AdminEditCategoryPage />}
            />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route
              path="/admin/notification"
              element={<AdminNotificationPage />}
            />
            <Route
              path="/admin/reset-password"
              element={<AdminResetPasswordPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster position="bottom-right" richColors />
      </div>
    </>
  );
}

export default App
