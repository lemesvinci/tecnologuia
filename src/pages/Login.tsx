// frontend/src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../config/api";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/profile");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Falha no login. Verifique suas credenciais.";
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail) {
      setErrors({ general: "Por favor, insira seu email." });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email: forgotEmail,
      });
      setForgotMessage(response.data.message);
      setErrors({});
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Erro ao enviar email de redefinição." });
      }
      setForgotMessage(null);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('fundo_site.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="relative z-10 max-w-md w-full space-y-6 bg-white bg-opacity-90 p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600 text-sm">
            Entre na sua conta Tecnologuia
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-100 text-red-800 p-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors.general}
          </div>
        )}

        {forgotMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {forgotMessage}
          </div>
        )}

        {!forgotPassword ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha *
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar ou ocultar senha"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition"
            >
              <LogIn size={18} />
              Entrar
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Registre-se
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label
                htmlFor="forgotEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Digite seu email
              </label>
              <input
                id="forgotEmail"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Email de Redefinição
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Voltar ao login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;