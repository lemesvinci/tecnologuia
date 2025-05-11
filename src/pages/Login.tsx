/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url('fundo_site.png')` }} // ajuste o caminho conforme sua pasta
    >
      {/* camada escura para contraste */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 card p-8 max-w-md w-full bg-white bg-opacity-90 rounded shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Login
        </h1>
        {error && (
          <p className="error-message text-center mb-4 text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
