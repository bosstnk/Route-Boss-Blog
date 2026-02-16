import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 restore auth ตอน refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
        });
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // 🔐 login = รับ token อย่างเดียว
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setUser({
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    });
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
