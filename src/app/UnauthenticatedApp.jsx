import { Routes, Route } from "react-router-dom";
// post
import LandingPage from "@/features/post/pages/LandingPage";
import ViewPostPage from "@/features/post/pages/ViewPostPage";
// member
import LogInPage from "@/features/auth/pages/LogInPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";


// shared
import NotFoundPage from "./NotFoundPage";

function UnauthenticatedApp() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/post/:postId" element={<ViewPostPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default UnauthenticatedApp;
