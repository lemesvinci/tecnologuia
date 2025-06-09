import {
  Cpu,
  Smartphone,
  Code,
  BookOpen,
  Zap,
  Users,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FeatureCard from "../components/ui/FeatureCard";
import { useState } from "react";
import { Accessibility } from "lucide-react"; // Ícone de acessibilidade (instale via npm install lucide-react)

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    highContrast: false,
    largeText: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Cpu,
      title: "Hardware",
      description:
        "Guias completos sobre componentes, montagem e manutenção de computadores.",
      to: "/hardware",
      image:
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: Code,
      title: "Programação",
      description:
        "Tutoriais de linguagens de programação e desenvolvimento de software.",
      to: "/programacao",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      description:
        "Dicas, reviews e comparativos de smartphones e aplicativos.",
      to: "/mobile",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: BookOpen,
      title: "Cursos",
      description:
        "Cursos online para aprimorar suas habilidades tecnológicas.",
      to: "/cursos",
      image:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: Zap,
      title: "Notícias",
      description: "Últimas notícias e tendências do mundo da tecnologia.",
      to: "/noticias",
      image:
        "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: Users,
      title: "Comunidade",
      description:
        "Conecte-se com outros entusiastas e profissionais de tecnologia.",
      to: "/comunidade",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
    {
      icon: Terminal,
      title: "Linux",
      description:
        "Aprenda sobre o sistema operacional Linux, sua instalação e comandos.",
      to: "/linux-intro",
      image:
        "https://images.pexels.com/photos/1181397/pexels-photo-1181397.jpeg?auto=compress&cs=tinysrgb&w=1600",
      videoLink: "https://www.youtube.com/cursoemvideo",
    },
  ];

  const toggleAccessibility = (option: keyof typeof accessibilityOptions) => {
    setAccessibilityOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32 ${
          accessibilityOptions.highContrast ? "bg-black text-yellow-300" : ""
        }`}
        role="banner"
        aria-label="Seção de Boas-Vindas"
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:w-2/3" role="region">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 animate-slide-up ${
                accessibilityOptions.largeText ? "text-6xl" : ""
              }`}
              tabIndex={0}
              aria-level="1"
            >
              Seu guia confiável no mundo da tecnologia
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-100 mb-8 animate-slide-up ${
                accessibilityOptions.largeText ? "text-3xl" : ""
              }`}
              style={{ animationDelay: "200ms" }}
              tabIndex={0}
            >
              Aprenda, explore e mantenha-se atualizado com as últimas novidades
              em tecnologia, programação e inovação.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up"
              style={{ animationDelay: "400ms" }}
              role="navigation"
            >
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Acessar Perfil"
                >
                  Acessar Perfil
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Começar Agora"
                  >
                    Começar Agora
                  </Link>
                  <Link
                    to="/login"
                    className="btn-outline text-lg py-3 px-8 bg-white bg-opacity-20 text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Fazer Login"
                  >
                    Fazer Login
                  </Link>
                </>
              )}
            </div>
            <div aria-live="polite" className="sr-only">
              {isAuthenticated
                ? "Você está autenticado. Clique em Acessar Perfil."
                : "Você não está autenticado. Clique em Começar Agora ou Fazer Login."}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className={`py-16 md:py-24 bg-gray-50 ${
          accessibilityOptions.highContrast ? "bg-gray-900 text-yellow-300" : ""
        }`}
        role="region"
        aria-label="Recursos Oferecidos"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                accessibilityOptions.largeText ? "text-5xl" : ""
              }`}
              tabIndex={0}
              aria-level="2"
            >
              O que oferecemos
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                accessibilityOptions.largeText ? "text-2xl" : ""
              }`}
              tabIndex={0}
            >
              Nossa plataforma reúne diversas áreas da tecnologia para mantê-lo
              sempre atualizado e aprendendo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
                to={feature.to}
                image={feature.image}
                videoLink={feature.videoLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 md:py-24 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white ${
          accessibilityOptions.highContrast ? "bg-black text-yellow-300" : ""
        }`}
        role="region"
        aria-label="Chamada para Ação"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              accessibilityOptions.largeText ? "text-5xl" : ""
            }`}
            tabIndex={0}
            aria-level="2"
          >
            Pronto para navegar pelo mundo da tecnologia?
          </h2>
          <p
            className={`text-xl text-gray-100 mb-8 max-w-3xl mx-auto ${
              accessibilityOptions.largeText ? "text-2xl" : ""
            }`}
            tabIndex={0}
          >
            Junte-se a milhares de pessoas que já estão aprendendo e
            compartilhando conhecimento em nossa plataforma.
          </p>
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Acessar Meu Perfil"
            >
              Acessar Meu Perfil
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Criar Conta Gratuita"
            >
              Criar Conta Gratuita
            </Link>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-16 md:py-24 bg-white ${
          accessibilityOptions.highContrast ? "bg-gray-900 text-yellow-300" : ""
        }`}
        role="region"
        aria-label="Depoimentos de Usuários"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                accessibilityOptions.largeText ? "text-5xl" : ""
              }`}
              tabIndex={0}
              aria-level="2"
            >
              O que nossos usuários dizem
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                accessibilityOptions.largeText ? "text-2xl" : ""
              }`}
              tabIndex={0}
            >
              Conheça as experiências dos membros da comunidade Tecnologuia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="card p-6 glass" role="article">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    alt={`Avatar do Usuário ${index + 1}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold" tabIndex={0}>
                      Usuário {index + 1}
                    </h4>
                    <p className="text-gray-500 text-sm" tabIndex={0}>
                      Membro desde 2024
                    </p>
                  </div>
                </div>
                <p
                  className={`text-gray-700 italic ${
                    accessibilityOptions.largeText ? "text-xl" : ""
                  }`}
                  tabIndex={0}
                >
                  "A Tecnologuia tem sido uma fonte incrível de conhecimento. Os
                  tutoriais são claros e as informações sempre atualizadas."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão de Acessibilidade */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white ${
            accessibilityOptions.highContrast ? "bg-yellow-300 text-black" : ""
          }`}
          aria-label="Abrir menu de acessibilidade"
          aria-expanded={isMenuOpen}
        >
          <Accessibility size={24} />
        </button>
        {isMenuOpen && (
          <div
            className={`absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 ${
              accessibilityOptions.highContrast
                ? "bg-gray-900 text-yellow-300 border-yellow-300"
                : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={accessibilityOptions.highContrast}
                onChange={() => toggleAccessibility("highContrast")}
                className="mr-2"
              />
              Alto Contraste
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={accessibilityOptions.largeText}
                onChange={() => toggleAccessibility("largeText")}
                className="mr-2"
              />
              Letras Grandes
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;