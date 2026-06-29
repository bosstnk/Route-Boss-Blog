import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "@/shared/utils/jwtinterceptor";
import ScrollToTop from "@/shared/components/common/ScrollToTop";

jwtInterceptor()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);