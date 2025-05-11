/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/components/FeaturePage.tsx
import { Link, useParams } from "react-router-dom";
import { Cpu, Smartphone, Code, BookOpen, Zap, Users } from "lucide-react";

interface FeatureContent {
  icon: React.FC<any>;
  title: string;
  description: string;
  content: string;
  relatedLinks?: { title: string; to: string }[];
}

const featureData: { [key: string]: FeatureContent } = {
  hardware: {
    icon: Cpu,
    title: "Hardware",
    description:
      "Guias completos sobre componentes, montagem e manutenção de computadores.",
    content: `
      Conheça o mundo do hardware de computadores com nossos guias completos. Desde a escolha de componentes como processadores, placas-mãe e GPUs, até dicas de montagem e manutenção. Aprenda a otimizar o desempenho do seu PC e a resolver problemas comuns.
      Explore tudo o que você precisa saber sobre hardware de computadores. Desde a escolha de componentes como processadores, placas-mãe e GPUs, até guias detalhados de montagem e manutenção. Aprenda a diagnosticar problemas, fazer upgrades e otimizar o desempenho do seu PC.

      **Tópicos em Destaque:**
      - Como escolher o melhor processador para o seu orçamento
      - Guia passo a passo para montar um PC do zero
      - Dicas para manutenção preventiva e limpeza de componentes
    `,
    relatedLinks: [
      { title: "Guia de Montagem de PC", to: "/hardware/montagem" },
      { title: "Melhores GPUs de 2025", to: "/hardware/gpus" },
    ],
  },
  programacao: {
    icon: Code,
    title: "Programação",
    description:
      "Tutoriais de linguagens de programação e desenvolvimento de software.",
    content: `
      Aprenda a programar com nossos tutoriais abrangentes e práticos. Cobrimos diversas linguagens, como JavaScript, Python, Java e C++, além de frameworks populares como React e Node.js. Seja você um iniciante ou um desenvolvedor experiente, temos algo para você.

      **Tópicos em Destaque:**
      - Introdução ao JavaScript para iniciantes
      - Construindo APIs RESTful com Node.js
      - Melhores práticas para escrever código limpo
    `,
    relatedLinks: [
      { title: "JavaScript para Iniciantes", to: "/programacao/javascript" },
      { title: "APIs com Node.js", to: "/programacao/node" },
    ],
  },
  mobile: {
    icon: Smartphone,
    title: "Mobile",
    description: "Dicas, reviews e comparativos de smartphones e aplicativos.",
    content: `
      Fique por dentro do mundo mobile com nossas dicas, reviews e comparativos. Analisamos os melhores smartphones do mercado, testamos aplicativos e oferecemos guias para melhorar sua experiência com dispositivos móveis.

      **Tópicos em Destaque:**
      - Review do iPhone 16: vale a pena?
      - Comparativo: Samsung Galaxy S25 vs Google Pixel 9
      - Melhores aplicativos para produtividade em 2025
    `,
    relatedLinks: [
      { title: "Review do iPhone 16", to: "/mobile/iphone16" },
      { title: "Melhores Apps de 2025", to: "/mobile/apps" },
    ],
  },
  cursos: {
    icon: BookOpen,
    title: "Cursos",
    description: "Cursos online para aprimorar suas habilidades tecnológicas.",
    content: `
      Nossos cursos online são projetados para ajudar você a dominar novas habilidades tecnológicas. Oferecemos desde cursos introdutórios até avançados, cobrindo áreas como desenvolvimento web, ciência de dados e inteligência artificial.

      **Tópicos em Destaque:**
      - Curso de React para Iniciantes
      - Fundamentos de Machine Learning com Python
      - Desenvolvimento de Aplicativos Android com Kotlin
    `,
    relatedLinks: [
      { title: "Curso de React", to: "/cursos/react" },
      { title: "Machine Learning com Python", to: "/cursos/ml-python" },
    ],
  },
  noticias: {
    icon: Zap,
    title: "Notícias",
    description: "Últimas notícias e tendências do mundo da tecnologia.",
    content: `
      Mantenha-se informado com as últimas notícias e tendências do mundo da tecnologia. Cobrimos lançamentos de produtos, inovações em IA, avanços em hardware e muito mais.

      **Tópicos em Destaque:**
      - Novo chip da NVIDIA revoluciona o mercado de GPUs
      - Apple anuncia novo MacBook com M4
      - Tendências de IA para 2025: o que esperar?
    `,
    relatedLinks: [
      { title: "Novo Chip da NVIDIA", to: "/noticias/nvidia-chip" },
      { title: "MacBook com M4", to: "/noticias/macbook-m4" },
    ],
  },
  comunidade: {
    icon: Users,
    title: "Comunidade",
    description:
      "Conecte-se com outros entusiastas e profissionais de tecnologia.",
    content: `
      Nossa comunidade é o lugar perfeito para se conectar com outros entusiastas e profissionais de tecnologia. Participe de discussões, compartilhe seus projetos e aprenda com os outros.

      **Tópicos em Destaque:**
      - Fóruns de discussão sobre tecnologia
      - Projetos colaborativos para desenvolvedores
      - Eventos e meetups para networking
    `,
    relatedLinks: [
      { title: "Fóruns de Discussão", to: "/comunidade/foruns" },
      { title: "Eventos e Meetups", to: "/comunidade/eventos" },
    ],
  },
};

const FeaturePage: React.FC = () => {
  const { section } = useParams<{ section: string }>();

  const feature = section ? featureData[section.toLowerCase()] : null;

  if (!feature) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Seção não encontrada</h1>
        <p className="text-gray-600">
          A seção que você está procurando não existe.{" "}
          <Link to="/" className="text-primary-600 hover:underline">
            Voltar para a Home
          </Link>
        </p>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Icon className="w-10 h-10 text-primary-600 mr-4" />
          <h1 className="text-3xl font-bold">{feature.title}</h1>
        </div>
        <p className="text-xl text-gray-600">{feature.description}</p>
      </div>

      <div className="prose prose-lg max-w-none">
        {feature.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph.startsWith("**") ? (
              <strong>{paragraph.replace(/\*\*/g, "")}</strong>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>

      {feature.relatedLinks && feature.relatedLinks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Conteúdos Relacionados
          </h2>
          <ul className="space-y-2">
            {feature.relatedLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.to} className="text-primary-600 hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <Link to="/" className="text-primary-600 hover:underline">
          ← Voltar para a Home
        </Link>
      </div>
    </div>
  );
};

export default FeaturePage;
