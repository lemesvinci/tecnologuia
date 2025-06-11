// frontend/pages/Home.tsx
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
import { Accessibility } from "lucide-react";

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
      <section
        className={`relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32 transition-all duration-700 ease-in-out ${
          accessibilityOptions.highContrast ? "bg-black text-yellow-300" : ""
        }`}
        role="banner"
        aria-label="Seção de Boas-Vindas"
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:w-2/3" role="region">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up ${
                accessibilityOptions.largeText ? "text-6xl" : ""
              }`}
              tabIndex={0}
              aria-level="1"
            >
              Seu guia confiável no mundo da tecnologia
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-100 mb-8 animate-fade-in-up delay-200 ${
                accessibilityOptions.largeText ? "text-3xl" : ""
              }`}
              tabIndex={0}
            >
              Aprenda, explore e mantenha-se atualizado com as últimas novidades
              em tecnologia, programação e inovação.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-400"
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
    </>
  );
};

export default Home;
