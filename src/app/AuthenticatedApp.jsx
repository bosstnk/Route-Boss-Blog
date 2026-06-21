import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigate } from "react-router-dom";

import SignUpSuccessPage from "@/features/auth/pages/SignUpPageSuccess";
// post
import LandingPage from "@/features/post/pages/LandingPage";
import ViewPostPage from "@/features/post/pages/ViewPostPage";
// member
import MemberProfilePage from "@/features/user/pages/MemberProfilePage";
import MemberResetPasswordPage from "@/features/user/pages/MemberResetPasswordPage";

// admin
import ArticleManagmentPage from "@/features/post/pages/ArticleManagementPage";
import AdminLogInPage from "@/features/auth/pages/AdminLogInPage";
import AdminCreateArticlePage from "@/features/post/pages/AdminCreateArticlePage";
import AdminEditArticlePage from "@/features/post/pages/AdminEditArticlePage";
import AdminCategoryManagementPage from "@/features/category/pages/AdminCategoryManagementPage";
import AdminCreateCategoryPage from "@/features/category/pages/AdminCreateCategoryPage";
import AdminEditCategoryPage from "@/features/category/pages/AdminEditCategoryPage";
import AdminProfilePage from "@/features/user/pages/AdminProfilePage";
import AdminResetPasswordPage from "@/features/user/pages/AdminResetPasswordPage";
import AdminNotificationPage from "@/features/notification/pages/AdminNotificationPage";

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
                <Route path="/signup" element={<Navigate to="/signup-success" replace />} />
                <Route path="/signup-success" element={<SignUpSuccessPage />} />

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
