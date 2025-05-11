// frontend/src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "../config/api";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  location?: string;
  occupation?: string;
  bio?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Carregando token do localStorage:", token); // Log 1
    console.log("Carregando userData do localStorage:", userData); // Log 2

    if (token && userData) {
      // Verificar se o token é válido fazendo uma requisição ao backend
      axios
        .get(`${API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data;
          console.log("Dados do usuário carregados: ", user); // Log 3
          localStorage.setItem("user", JSON.stringify(user)); // Atualizar os dados do usuário
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setIsAuthenticated(true);
          setUser(user);
        })
        .catch((err) => {
          console.error("Token inválido ou expirado:", err);
          logout(); // Deslogar se o token for inválido
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data.message || "Erro ao fazer login");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      const { message } = response.data;
      console.log(message);
    } catch (error: any) {
      throw new Error(error.response?.data.message || "Erro ao registrar");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
