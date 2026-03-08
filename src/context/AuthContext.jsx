import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true);

  // 🔁 restore auth ตอน refresh
  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
        });
  
        // ⭐ fetch profile ใหม่ทุกครั้งที่ refresh
        const result = await axios.get(`${API_BASE_URL}/user`);
        setProfile(result.data);
      } catch (error) {
        console.error("RESTORE AUTH ERROR:", error);
        localStorage.removeItem("token");
        setUser(null);
        setProfile({});
      } finally {
        setLoading(false);
      }
    };
  
    restoreAuth();
  }, []);

  // 🔐 login = รับ token อย่างเดียว
  const login = async (token) => {
    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);
    setUser({
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    });

    try {
      const result = await axios.get(`${API_BASE_URL}/user`);
      setProfile(result.data); // ⭐ สำคัญ
    } catch (error) {
      console.error("FETCH PROFILE ERROR:", error);
    }
  };

  // 🚪 logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        profile,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook สำหรับเรียกใช้
export const useAuth = () => useContext(AuthContext);
