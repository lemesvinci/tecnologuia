// frontend/src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
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
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
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
      windows.location.href = ("/home");
    } catch (error: any) {
      setErrors({
        general: error.message || "Falha no login. Verifique suas credenciais.",
      });
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
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data.message ||
          "Erro ao enviar email de redefinição.",
      });
      setForgotMessage(null);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('fundo_site.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="relative z-10 max-w-md w-full space-y-8 card p-8 bg-white bg-opacity-90 rounded shadow-md animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600">Entre na sua conta Tecnologuia</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {errors.general}
          </div>
        )}

        {forgotMessage && (
          <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {forgotMessage}
          </div>
        )}

        {!forgotPassword ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              error={errors.email}
              autoComplete="email"
            />

            <FormInput
              id="password"
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-sm text-primary-600 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              <LogIn size={18} className="mr-2" />
              Entrar
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Registre-se
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <FormInput
              id="forgotEmail"
              label="Digite seu email"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <Button type="submit" variant="primary" fullWidth>
              Enviar Email de Redefinição
            </Button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="text-sm text-primary-600 hover:underline"
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