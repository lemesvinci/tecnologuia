/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";

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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
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
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setErrors({
        general: "Falha no cadastro. Por favor, tente novamente.",
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

      <div className="relative z-10 max-w-md w-full space-y-8 card p-8 bg-white bg-opacity-90 rounded shadow-md animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crie sua conta
          </h1>
          <p className="text-gray-600">Junte-se à comunidade Tecnologuia</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {errors.general}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label="Nome completo"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
            error={errors.name}
            autoComplete="name"
          />

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
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            error={errors.password}
            autoComplete="new-password"
          />

          <FormInput
            id="confirmPassword"
            label="Confirmar senha"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Concordo com os{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Política de Privacidade
              </a>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
          >
            <UserPlus size={18} className="mr-2" />
            Criar conta
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;