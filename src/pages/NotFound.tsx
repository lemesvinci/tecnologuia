import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-2">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;