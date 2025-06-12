// frontend/src/pages/Home.tsx
import { Cpu, Smartphone, Code, BookOpen, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FeatureCard from "../components/ui/FeatureCard";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Cpu,
      title: "Hardware",
      description:
        "Guias completos sobre componentes, montagem e manutenção de computadores.",
      to: "/hardware",
      image:
        "https://images.pexels.com/photos/163125/computer-pc-workstation-electronics-163125.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Code,
      title: "Programação",
      description:
        "Tutoriais de linguagens de programação e desenvolvimento de software.",
      to: "/programacao",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      description:
        "Dicas, reviews e comparativos de smartphones e aplicativos.",
      to: "/mobile",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: BookOpen,
      title: "Cursos",
      description:
        "Cursos online para aprimorar suas habilidades tecnológicas.",
      to: "/cursos",
      image:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Zap,
      title: "Notícias",
      description: "Últimas notícias e tendências do mundo da tecnologia.",
      to: "/noticias",
      image:
        "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Users,
      title: "Comunidade",
      description:
        "Conecte-se com outros entusiastas e profissionais de tecnologia.",
      to: "/comunidade",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Seu guia confiável no mundo da tecnologia
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-100 mb-8 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              Aprenda, explore e mantenha-se atualizado com as últimas novidades
              em tecnologia, programação e inovação.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              {isAuthenticated ? (
                <Link to="/profile" className="btn-accent text-lg py-3 px-8">
                  Acessar Perfil
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-accent text-lg py-3 px-8">
                    Começar Agora
                  </Link>
                  <Link
                    to="/login"
                    className="btn-outline text-lg py-3 px-8 bg-white bg-opacity-20 text-white border-white"
                  >
                    Fazer Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que oferecemos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                image={feature.image} // Passar a imagem para o card
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para navegar pelo mundo da tecnologia?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já estão aprendendo e
            compartilhando conhecimento em nossa plataforma.
          </p>
          {isAuthenticated ? (
            <Link to="/profile" className="btn-accent text-lg py-3 px-8">
              Acessar Meu Perfil
            </Link>
          ) : (
            <Link to="/register" className="btn-accent text-lg py-3 px-8">
              Criar Conta Gratuita
            </Link>
          )}
        </div>
      </section>

      {/* Testimonials (simplified) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça as experiências dos membros da comunidade Tecnologuia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="card p-6 glass">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Usuário {index + 1}</h4>
                    <p className="text-gray-500 text-sm">Membro desde 2024</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "A Tecnologuia tem sido uma fonte incrível de conhecimento. Os
                  tutoriais são claros e as informações sempre atualizadas."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;