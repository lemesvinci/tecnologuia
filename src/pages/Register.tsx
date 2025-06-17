// frontend/src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar senha

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t("users.nameRequired") || "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t("users.emailRequired") || "Email é obrigatório";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("users.invalidEmail") || "Email inválido";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = t("users.passwordRequired") || "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password =
        t("users.passwordMinLength") ||
        "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        t("users.passwordMismatch") || "As senhas não coincidem";
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
      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );
      navigate("/");
    } catch (error) {
      setErrors({
        general:
          t("users.registrationFailure") ||
          "Falha no cadastro. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('fundo_site.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 max-w-md w-full bg-white bg-opacity-90 rounded-xl p-8 shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("users.registerTitle") || "Crie sua conta"}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {t("users.joinCommunity") || "Junte-se à comunidade Tecnologuia"}
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-100 text-red-800 p-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t("users.name") || "Nome completo"}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("users.namePlaceholder") || "Seu nome"}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("users.email") || "Email"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("users.emailPlaceholder") || "seu@email.com"}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("users.password") || "Senha"}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={t("users.passwordPlaceholder") || "••••••••"}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {t("users.confirmPassword") || "Confirmar senha"}
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={
                  t("users.confirmPasswordPlaceholder") || "••••••••"
                }
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Termos */}
          <div className="flex items-start text-sm text-gray-600">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="terms">
              {t("users.termsAgreement") || "Concordo com os"}{" "}
              <a href="#" className="text-blue-600 hover:underline">
                {t("users.termsOfUse") || "Termos de Uso"}
              </a>{" "}
              {t("users.and") || "e"}{" "}
              <a href="#" className="text-blue-600 hover:underline">
                {t("users.privacyPolicy") || "Política de Privacidade"}
              </a>
              .
            </label>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition"
          >
            <UserPlus size={18} />
            {t("users.createAccount") || "Criar conta"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {t("users.alreadyHaveAccount") || "Já tem uma conta?"}{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              {t("users.loginLink") || "Faça login"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;