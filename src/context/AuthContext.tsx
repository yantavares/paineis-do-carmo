import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  user: any;
  role: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  role: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    if (newToken) setUser(jwtDecode(newToken));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    setRole(user?.groups ? user?.groups[0] : "user");
  }, [user]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      if (savedToken !== "admin" && savedToken) setUser(jwtDecode(savedToken));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
