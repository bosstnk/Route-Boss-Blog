import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        setProfile(null);
        return;
      }

      const result = await axios.get(`${API_BASE_URL}/user`);

      console.log("✅ Fetch profile success:", result.data);

      setProfile(result.data);
    } catch (error) {
      console.log(
        "❌ Fetch profile error:",
        error.response?.data || error.message
      );

      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  function login(token) {
    console.log("🔐 Login success");

    localStorage.setItem("token", token);
    fetchProfile();
  }

  function logout() {
    console.log("🚪 Logout");

    localStorage.removeItem("token");
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        isLoading,
        isAuthenticated: !!profile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);