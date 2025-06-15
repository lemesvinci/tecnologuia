// frontend/src/i18n.ts
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    pt: {
      translation: {
        hero: {
          title: "Seu guia confiável no mundo da tecnologia",
          description:
            "Aprenda, explore e mantenha-se atualizado com as últimas novidades em tecnologia, programação e inovação.",
          profileLink: "Acessar Perfil",
          registerLink: "Começar Agora",
          loginLink: "Fazer Login",
          authenticatedMessage:
            "Você está autenticado. Clique em Acessar Perfil.",
          unauthenticatedMessage:
            "Você não está autenticado. Clique em Começar Agora ou Fazer Login.",
        },
        features: {
          title: "O que oferecemos",
          description:
            "Nossa plataforma reúne diversas áreas da tecnologia para mantê-lo sempre atualizado e aprendendo.",
          cardLink: "Ir para {{title}}",
          hardware: {
            title: "Hardware",
            description:
              "Guias completos sobre componentes, montagem e manutenção de computadores.",
          },
          programming: {
            title: "Programação",
            description:
              "Tutoriais de linguagens de programação e desenvolvimento de software.",
          },
          mobile: {
            title: "Mobile",
            description:
              "Dicas, reviews e comparativos de smartphones e aplicativos.",
          },
          courses: {
            title: "Cursos",
            description:
              "Cursos online para aprimorar suas habilidades tecnológicas.",
          },
          news: {
            title: "Notícias",
            description:
              "Últimas notícias e tendências do mundo da tecnologia.",
          },
          community: {
            title: "Comunidade",
            description:
              "Conecte-se com outros entusiastas e profissionais de tecnologia.",
          },
          linux: {
            title: "Linux",
            description:
              "Aprenda sobre o sistema operacional Linux, sua instalação e comandos.",
          },
        },
        cta: {
          title: "Pronto para navegar pelo mundo da tecnologia?",
          description:
            "Junte-se a milhares de pessoas que já estão aprendendo e compartilhando conhecimento em nossa plataforma.",
          profileLink: "Acessar Meu Perfil",
          registerLink: "Criar Conta Gratuita",
        },
        testimonials: {
          title: "O que nossos usuários dizem",
          description:
            "Conheça as experiências dos membros da comunidade Tecnologuia.",
          user1: {
            name: "Usuário 1",
            quote:
              "A Tecnologuia tem sido uma fonte incrível de conhecimento. Os tutoriais são claros e as informações sempre atualizadas.",
          },
          user2: {
            name: "Usuário 2",
            quote:
              "A comunidade é acolhedora e os recursos me ajudaram a crescer profissionalmente.",
          },
          user3: {
            name: "Usuário 3",
            quote:
              "Os cursos são práticos e me ajudaram a dominar novas tecnologias rapidamente.",
          },
          memberSince: "Membro desde 2024",
          avatarAlt: "Avatar de {{name}}",
        },
        accessibility: {
          toggleMenu: "Abrir menu de acessibilidade",
          menuLabel: "Menu de opções de acessibilidade",
          highContrast: "Alto Contraste",
          largeText: "Letras Grandes",
          darkMode: "Modo Escuro",
          reducedMotion: "Reduzir Animações",
          colorBlind: "Modo Daltonismo",
          language: "Idioma",
          languageSelect: "Selecionar idioma",
          pt: "Português",
          en: "Inglês",
        },
      },
    },
    en: {
      translation: {
        hero: {
          title: "Your trusted guide in the world of technology",
          description:
            "Learn, explore, and stay updated with the latest in technology, programming, and innovation.",
          profileLink: "Access Profile",
          registerLink: "Get Started",
          loginLink: "Log In",
          authenticatedMessage: "You are authenticated. Click Access Profile.",
          unauthenticatedMessage:
            "You are not authenticated. Click Get Started or Log In.",
        },
        features: {
          title: "What we offer",
          description:
            "Our platform brings together various areas of technology to keep you learning and updated.",
          cardLink: "Go to {{title}}",
          hardware: {
            title: "Hardware",
            description:
              "Comprehensive guides on components, assembly, and computer maintenance.",
          },
          programming: {
            title: "Programming",
            description:
              "Tutorials on programming languages and software development.",
          },
          mobile: {
            title: "Mobile",
            description:
              "Tips, reviews, and comparisons of smartphones and apps.",
          },
          courses: {
            title: "Courses",
            description: "Online courses to enhance your technological skills.",
          },
          news: {
            title: "News",
            description: "Latest news and trends in the world of technology.",
          },
          community: {
            title: "Community",
            description:
              "Connect with other technology enthusiasts and professionals.",
          },
          linux: {
            title: "Linux",
            description:
              "Learn about the Linux operating system, its installation, and commands.",
          },
        },
        cta: {
          title: "Ready to navigate the world of technology?",
          description:
            "Join thousands of people already learning and sharing knowledge on our platform.",
          profileLink: "Access My Profile",
          registerLink: "Create Free Account",
        },
        testimonials: {
          title: "What our users say",
          description:
            "Discover the experiences of Tecnologuia community members.",
          user1: {
            name: "User 1",
            quote:
              "Tecnologuia has been an incredible source of knowledge. The tutorials are clear and always up-to-date.",
          },
          user2: {
            name: "User 2",
            quote:
              "The community is welcoming, and the resources helped me grow professionally.",
          },
          user3: {
            name: "User 3",
            quote:
              "The courses are practical and helped me master new technologies quickly.",
          },
          memberSince: "Member since 2024",
          avatarAlt: "Avatar of {{name}}",
        },
        accessibility: {
          toggleMenu: "Open accessibility menu",
          menuLabel: "Accessibility options menu",
          highContrast: "High Contrast",
          largeText: "Large Text",
          darkMode: "Dark Mode",
          reducedMotion: "Reduced Motion",
          colorBlind: "Color Blind Mode",
          language: "Language",
          languageSelect: "Select language",
          pt: "Portuguese",
          en: "English",
        },
      },
    },
  },
  lng: "pt",
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export default i18next;
