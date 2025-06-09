import { Terminal, Download, Code } from 'lucide-react';

const LinuxContent = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main" aria-label="Conteúdo sobre Linux">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Terminal size={40} className="text-primary-600 mr-4" />
          <h1 className="text-3xl font-bold" tabIndex={0} aria-level="1">Conteúdo sobre Linux</h1>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center" tabIndex={0} aria-level="2">
            <Code size={20} className="mr-2 text-primary-600" />
            Comandos Básicos
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 mb-2" tabIndex={0}>
              Aqui estão alguns comandos essenciais para começar a usar o Linux:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><code>ls</code> ou <code>dir</code> - Listar arquivos (depende da distribuição)</li>
              <li><code>cd /caminho</code> - Navegar entre diretórios</li>
              <li><code>sudo apt update</code> - Atualizar pacotes (Ubuntu/Debian)</li>
              <li><code>man comando</code> - Ver manual de um comando</li>
            </ul>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center" tabIndex={0} aria-level="2">
            <Download size={20} className="mr-2 text-primary-600" />
            Instalação
          </h2>
          <p className="text-gray-700 mb-2" tabIndex={0}>
            Para instalar o Linux, siga estes passos:
          </p>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Baixe uma distribuição (ex.: Ubuntu em <a href="https://ubuntu.com/download" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ubuntu.com</a>)</li>
            <li>Crie um pendrive bootável com ferramentas como Rufus</li>
            <li>Reinicie o computador e entre no modo de boot (geralmente F12 ou Esc)</li>
            <li>Siga o instalador, escolhendo particionamento e usuário</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center" tabIndex={0} aria-level="2">
            <Code size={20} className="mr-2 text-primary-600" />
            Recursos Adicionais
          </h2>
          <p className="text-gray-700" tabIndex={0}>
            Explore tutoriais e documentação oficial para aprofundar seus conhecimentos:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
            <li><a href="https://www.linux.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Linux.org</a> - Comunidade e guias</li>
            <li><a href="https://tldp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TLDP</a> - The Linux Documentation Project</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LinuxContent;