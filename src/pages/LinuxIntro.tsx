import { Link } from 'react-router-dom';
import { BookOpen, Terminal } from 'lucide-react';

const LinuxIntro = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main" aria-label="Introdução ao Linux">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Terminal size={40} className="text-primary-600 mr-4" />
          <h1 className="text-3xl font-bold" tabIndex={0} aria-level="1">Introdução ao Linux</h1>
        </div>
        <p className="text-lg text-gray-700 mb-4" tabIndex={0}>
          Linux é um sistema operacional de código aberto, baseado no kernel desenvolvido por Linus Torvalds em 1991. Diferente de sistemas proprietários como Windows ou macOS, o Linux é altamente personalizável, gratuito e amplamente utilizado em servidores, dispositivos embarcados e desktops.
        </p>
        <p className="text-lg text-gray-700 mb-6" tabIndex={0}>
          Sua história começou como um projeto pessoal que evoluiu para uma comunidade global de desenvolvedores. Hoje, distribuições como Ubuntu, Fedora e Debian tornam o Linux acessível a todos, desde iniciantes até profissionais de TI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center" tabIndex={0} aria-level="2">
              <BookOpen size={20} className="mr-2 text-primary-600" />
              Benefícios
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Gratuito e de código aberto</li>
              <li>Alta segurança e estabilidade</li>
              <li>Personalização ilimitada</li>
              <li>Suporte a uma vasta comunidade</li>
            </ul>
          </div>
          <div className="card p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center" tabIndex={0} aria-level="2">
              <BookOpen size={20} className="mr-2 text-primary-600" />
              Próximos Passos
            </h2>
            <p className="text-gray-600" tabIndex={0}>
              Explore o conteúdo detalhado sobre Linux para aprender comandos, instalação e uso prático. Clique abaixo para começar!
            </p>
            <Link
              to="/linux-content"
              className="mt-4 inline-block bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
              aria-label="Ir para Conteúdo sobre Linux"
            >
              Ver Conteúdo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinuxIntro;