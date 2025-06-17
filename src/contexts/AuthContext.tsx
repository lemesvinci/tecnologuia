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
  role: string; // Obrigatório
  phone?: string;
  location?: string;
  occupation?: string;
  bio?: string;
  createdAt?: string; // Adicionado para compatibilidade com authController
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null; // Adicionado para gerenciar o token
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Inicializando AuthContext:", {
      token: !!storedToken,
      userData,
    }); // Log 1

    if (storedToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Usuário do localStorage:", parsedUser); // Log 2
        if (!parsedUser.role) {
          console.warn("Usuário sem role, deslogando...");
          logout();
          return;
        }

        // Verificar token no backend
        axios
          .get(`${API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const user = response.data;
            console.log("Perfil carregado do backend:", user); // Log 3
            if (!user.role) {
              console.warn("Perfil sem role, deslogando...");
              logout();
              return;
            }
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storedToken}`;
            setIsAuthenticated(true);
            setUser(user);
            setToken(storedToken); // Atualiza o token no estado
          })
          .catch((error) => {
            console.error("Erro ao verificar token:", {
              message: error.message,
              response: error.response?.data,
            });
            logout();
          });
      } catch (error) {
        console.error("Erro ao parsear userData:", error);
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log("Tentando login:", {
        email,
        url: `${API_URL}/api/auth/login`,
      }); // Log 4
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      console.log("Login bem-sucedido:", { user, token: !!token }); // Log 5

      if (!user.role) {
        throw new Error("Resposta do login não inclui role");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser(user);
      setToken(token); // Atualiza o token no estado
    } catch (error: any) {
      console.error("Erro no login:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(error.response?.data.message || "Erro ao fazer login");
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      console.log("Registro bem-sucedido:", response.data.message); // Log 6
    } catch (error: any) {
      console.error("Erro no registro:", {
        message: error.message,
        response: error.response?.data,
      });
      throw new Error(error.response?.data.message || "Erro ao registrar");
    }
  };

  const logout = () => {
    console.log("Realizando logout..."); // Log 7
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
    setToken(null); // Limpa o token no estado
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      console.log("Atualizando usuário:", updatedUser); // Log 8
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
