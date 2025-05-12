// frontend/src/pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Lock } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config/api";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrors({ general: "Token de redefinição inválido ou ausente." });
    }
  }, [token]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória";
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      setSuccess(response.data.message);
      setErrors({});
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      setErrors({
        general: axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : "Erro ao redefinir senha.",
      });
      setSuccess(null);
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
            Redefinir Senha
          </h1>
          <p className="text-gray-600">Digite sua nova senha abaixo</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {errors.general}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            id="newPassword"
            label="Nova senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={errors.newPassword}
            autoComplete="new-password"
          />

          <FormInput
            id="confirmPassword"
            label="Confirmar nova senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
          >
            <Lock size={18} className="mr-2" />
            Redefinir Senha
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;