import { Routes, Route } from "react-router-dom";
// post
import LandingPage from "./post/LandingPage";
import ViewPostPage from "./post/ViewPostPage";
// member
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import SignUpSuccessPage from "./SignUpPageSuccess";

// shared
import NotFoundPage from "./NotFoundPage";

function UnauthenticatedApp() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/post/:postId" element={<ViewPostPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signup-success" element={<SignUpSuccessPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default UnauthenticatedApp;
