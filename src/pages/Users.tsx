// frontend/pages/Users.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role?: string;
}

const Users = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        if (!response.ok) throw new Error('Falha ao carregar usuários');
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Data indisponível' : date.toLocaleString('pt-BR', { timeZone: 'UTC' });
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center">Carregando usuários...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main" aria-label="Lista de Usuários">
      <h1 className="text-3xl font-bold mb-8" tabIndex={0} aria-level="1">Lista de Usuários</h1>

      {error && (
        <p className="text-red-600 mb-6" role="alert">{error}</p>
      )}

      {!isAuthenticated ? (
        <p className="text-gray-600">
          Você precisa estar logado para visualizar esta página.{' '}
          <Link to="/login" className="text-blue-600 hover:underline" aria-label="Faça login aqui">
            Faça login aqui
          </Link>
          .
        </p>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" tabIndex={0}>Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" tabIndex={0}>Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" tabIndex={0}>Data de Criação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap" tabIndex={0}>{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap" tabIndex={0}>{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap" tabIndex={0}>{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap" tabIndex={0}>{user.role || 'Usuário'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-gray-600 text-center py-4" role="status">Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;