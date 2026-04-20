import { Routes, Route } from "react-router-dom";
// post
import LandingPage from "./post/LandingPage";
import ViewPostPage from "./post/ViewPostPage";
// member
import LogInPage from "./auth/LogInPage";
import SignUpPage from "./auth/SignUpPage";


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
