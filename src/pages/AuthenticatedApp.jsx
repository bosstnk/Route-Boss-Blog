import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigate } from "react-router-dom";
// post
import LandingPage from "./post/LandingPage";
import ViewPostPage from "./post/ViewPostPage";
// member
import MemberProfilePage from "./MemberProfilePage";
import MemberResetPasswordPage from "./MemberResetPasswordPage";

// admin
import ArticleManagmentPage from "./admin/ArticleManagementPage";
import AdminLogInPage from "./admin/AdminLogInPage";
import AdminCreateArticlePage from "./admin/AdminCreateArticlePage";
import AdminEditArticlePage from "./admin/AdminEditArticlePage";
import AdminCategoryManagementPage from "./admin/AdminCategoryManagementPage";
import AdminCreateCategoryPage from "./admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./admin/AdminEditCategoryPage";
import AdminProfilePage from "./admin/AdminProfilePage";
import AdminResetPasswordPage from "./admin/AdminResetPasswordPage";
import AdminNotificationPage from "./admin/AdminNotificationPage";

// shared
import NotFoundPage from "./NotFoundPage";


function AuthenticatedApp() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/post/:postId" element={<ViewPostPage />} />
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
            <Toaster position="bottom-right" richColors />
        </div>

    );
}

export default AuthenticatedApp;
