import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Smartphone,
  Code,
  BookOpen,
  Zap,
  Users,
  Terminal,
  Accessibility,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FeatureCard from "../components/ui/FeatureCard";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Configuração de variantes para animações
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" },
};

const menuVariants = {
  closed: { opacity: 0, scale: 0, y: 20 },
  open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    highContrast: false,
    largeText: false,
    darkMode: false,
    reducedMotion: false,
    colorBlind: false,
    language: "pt",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Carregar preferências do localStorage
  useEffect(() => {
    const savedOptions = localStorage.getItem("accessibilityOptions");
    if (savedOptions) {
      const parsedOptions = JSON.parse(savedOptions);
      setAccessibilityOptions(parsedOptions);
      i18n.changeLanguage(parsedOptions.language);
      document.body.classList.toggle("dark", parsedOptions.darkMode);
      document.body.classList.toggle(
        "high-contrast",
        parsedOptions.highContrast
      );
      document.body.classList.toggle("large-text", parsedOptions.largeText);
      document.body.classList.toggle("color-blind", parsedOptions.colorBlind);
    }
    console.log("Acessibilidade carregada:", savedOptions); // Log para depuração
  }, [i18n]);

  // Salvar preferências no localStorage
  useEffect(() => {
    localStorage.setItem(
      "accessibilityOptions",
      JSON.stringify(accessibilityOptions)
    );
    document.body.classList.toggle("dark", accessibilityOptions.darkMode);
    document.body.classList.toggle(
      "high-contrast",
      accessibilityOptions.highContrast
    );
    document.body.classList.toggle(
      "large-text",
      accessibilityOptions.largeText
    );
    document.body.classList.toggle(
      "color-blind",
      accessibilityOptions.colorBlind
    );
    i18n.changeLanguage(accessibilityOptions.language);
    console.log("Acessibilidade atualizada:", accessibilityOptions); // Log para depuração
  }, [accessibilityOptions, i18n]);

  const toggleAccessibility = (
    option: keyof typeof accessibilityOptions,
    value?: any
  ) => {
    setAccessibilityOptions((prev) => ({
      ...prev,
      [option]: value !== undefined ? value : !prev[option],
    }));
  };

  const features = [
    {
      icon: Cpu,
      title: t("features.hardware.title"),
      description: t("features.hardware.description"),
      to: "/hardware",
      image:
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      icon: Code,
      title: t("features.programming.title"),
      description: t("features.programming.description"),
      to: "/programacao",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Smartphone,
      title: t("features.mobile.title"),
      description: t("features.mobile.description"),
      to: "/mobile",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: BookOpen,
      title: t("features.courses.title"),
      description: t("features.courses.description"),
      to: "/cursos",
      image:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Zap,
      title: t("features.news.title"),
      description: t("features.news.description"),
      to: "/noticias",
      image:
        "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Users,
      title: t("features.community.title"),
      description: t("features.community.description"),
      to: "/comunidade",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: Terminal,
      title: t("features.linux.title"),
      description: t("features.linux.description"),
      to: "/linux-intro",
      image:
        "https://images.pexels.com/photos/1181397/pexels-photo-1181397.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className={accessibilityOptions.reducedMotion ? "reduced-motion" : ""}>
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className={`relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32 ${
          accessibilityOptions.highContrast
            ? "bg-black text-yellow-300"
            : accessibilityOptions.darkMode
            ? "bg-gray-900"
            : ""
        }`}
        role="banner"
        aria-label={t("sections.hero.label")}
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center md:text-left md:w-2/3"
            role="region"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                accessibilityOptions.largeText ? "text-6xl" : ""
              }`}
              tabIndex={0}
              aria-level="1"
            >
              {t("hero.title")}
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-100 mb-8 ${
                accessibilityOptions.largeText ? "text-3xl" : ""
              }`}
              tabIndex={0}
            >
              {t("hero.description")}
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              role="navigation"
            >
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white hover:bg-accent-600"
                  aria-label={t("hero.profileLink")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("hero.profileLink")}
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white hover:bg-accent-600"
                    aria-label={t("hero.registerLink")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("hero.registerLink")}
                  </Link>
                  <Link
                    to="/login"
                    className="btn-outline text-lg py-3 px-8 bg-white bg-opacity-20 text-white border-white focus:outline-none focus:ring-2 focus:ring-white hover:bg-white hover:text-gray-900"
                    aria-label={t("hero.loginLink")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("hero.loginLink")}
                  </Link>
                </>
              )}
            </motion.div>
            <div aria-live="polite" className="sr-only">
              {isAuthenticated
                ? t("hero.authenticatedMessage")
                : t("hero.unauthenticatedMessage")}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-16 md:py-24 bg-gray-50 ${
          accessibilityOptions.highContrast
            ? "bg-gray-900 text-yellow-300"
            : accessibilityOptions.darkMode
            ? "bg-gray-800 text-white"
            : ""
        }`}
        role="region"
        aria-label={t("sections.features.label")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                accessibilityOptions.largeText ? "text-5xl" : ""
              }`}
              tabIndex={0}
              aria-level="2"
            >
              {t("features.title")}
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                accessibilityOptions.largeText
                  ? "text-2xl"
                  : accessibilityOptions.darkMode
                  ? "text-gray-300"
                  : ""
              }`}
              tabIndex={0}
            >
              {t("features.description")}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  to={feature.to}
                  image={feature.image}
                  accessibilityOptions={accessibilityOptions}
                  aria-label={t("features.cardLink", { title: feature.title })}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-16 md:py-24 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white ${
          accessibilityOptions.highContrast
            ? "bg-black text-yellow-300"
            : accessibilityOptions.darkMode
            ? "bg-gray-900"
            : ""
        }`}
        role="region"
        aria-label={t("sections.cta.label")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              accessibilityOptions.largeText ? "text-5xl" : ""
            }`}
            tabIndex={0}
            aria-level="2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            className={`text-xl text-gray-100 mb-8 max-w-3xl mx-auto ${
              accessibilityOptions.largeText ? "text-2xl" : ""
            }`}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("cta.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white hover:bg-accent-600"
                aria-label={t("cta.profileLink")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("cta.profileLink")}
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn-accent text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-white hover:bg-accent-600"
                aria-label={t("cta.registerLink")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("cta.registerLink")}
              </Link>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-16 md:py-24 bg-white ${
          accessibilityOptions.highContrast
            ? "bg-gray-900 text-yellow-300"
            : accessibilityOptions.darkMode
            ? "bg-gray-800 text-white"
            : ""
        }`}
        role="region"
        aria-label={t("sections.testimonials.label")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                accessibilityOptions.largeText ? "text-5xl" : ""
              }`}
              tabIndex={0}
              aria-level="2"
            >
              {t("testimonials.title")}
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                accessibilityOptions.largeText
                  ? "text-2xl"
                  : accessibilityOptions.darkMode
                  ? "text-gray-300"
                  : ""
              }`}
              tabIndex={0}
            >
              {t("testimonials.description")}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: t("testimonials.user1.name"),
                quote: t("testimonials.user1.quote"),
              },
              {
                name: t("testimonials.user2.name"),
                quote: t("testimonials.user2.quote"),
              },
              {
                name: t("testimonials.user3.name"),
                quote: t("testimonials.user3.quote"),
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="card p-6 glass"
                role="article"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    alt={t("testimonials.avatarAlt", {
                      name: testimonial.name,
                    })}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold" tabIndex={0}>
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-gray-500 text-sm ${
                        accessibilityOptions.darkMode ? "text-gray-400" : ""
                      }`}
                      tabIndex={0}
                    >
                      {t("testimonials.memberSince")}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-gray-700 italic ${
                    accessibilityOptions.largeText
                      ? "text-xl"
                      : accessibilityOptions.darkMode
                      ? "text-gray-300"
                      : ""
                  }`}
                  tabIndex={0}
                >
                  {testimonial.quote}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Accessibility Menu */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white ${
            accessibilityOptions.highContrast
              ? "bg-yellow-300 text-black"
              : accessibilityOptions.darkMode
              ? "bg-gray-700"
              : ""
          }`}
          aria-label={t("accessibility.toggleMenu")}
          aria-expanded={isMenuOpen}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Accessibility size={24} />
        </motion.button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 ${
                accessibilityOptions.highContrast
                  ? "bg-gray-900 text-yellow-300 border-yellow-300"
                  : accessibilityOptions.darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : ""
              }`}
              role="menu"
              aria-label={t("accessibility.menuLabel")}
            >
              <label className="flex items-center mb-2" role="menuitem">
                <input
                  type="checkbox"
                  checked={accessibilityOptions.highContrast}
                  onChange={() => toggleAccessibility("highContrast")}
                  className="mr-2 focus:ring-2 focus:ring-blue-600"
                  aria-label={t("accessibility.highContrast")}
                />
                {t("accessibility.highContrast")}
              </label>
              <label className="flex items-center mb-2" role="menuitem">
                <input
                  type="checkbox"
                  checked={accessibilityOptions.largeText}
                  onChange={() => toggleAccessibility("largeText")}
                  className="mr-2 focus:ring-2 focus:ring-blue-600"
                  aria-label={t("accessibility.largeText")}
                />
                {t("accessibility.largeText")}
              </label>
              <label className="flex items-center mb-2" role="menuitem">
                <input
                  type="checkbox"
                  checked={accessibilityOptions.darkMode}
                  onChange={() => toggleAccessibility("darkMode")}
                  className="mr-2 focus:ring-2 focus:ring-blue-600"
                  aria-label={t("accessibility.darkMode")}
                />
                {t("accessibility.darkMode")}
              </label>
              <label className="flex items-center mb-2" role="menuitem">
                <input
                  type="checkbox"
                  checked={accessibilityOptions.reducedMotion}
                  onChange={() => toggleAccessibility("reducedMotion")}
                  className="mr-2 focus:ring-2 focus:ring-blue-600"
                  aria-label={t("accessibility.reducedMotion")}
                />
                {t("accessibility.reducedMotion")}
              </label>
              <label className="flex items-center mb-2" role="menuitem">
                <input
                  type="checkbox"
                  checked={accessibilityOptions.colorBlind}
                  onChange={() => toggleAccessibility("colorBlind")}
                  className="mr-2 focus:ring-2 focus:ring-blue-600"
                  aria-label={t("accessibility.colorBlind")}
                />
                {t("accessibility.colorBlind")}
              </label>
              <div className="flex items-center mb-2" role="menuitem">
                <label htmlFor="language" className="mr-2">
                  {t("accessibility.language")}
                </label>
                <select
                  id="language"
                  value={accessibilityOptions.language}
                  onChange={(e) =>
                    toggleAccessibility("language", e.target.value)
                  }
                  className={`bg-gray-100 p-1 rounded ${
                    accessibilityOptions.darkMode
                      ? "bg-gray-700 text-white"
                      : ""
                  }`}
                  aria-label={t("accessibility.languageSelect")}
                >
                  <option value="pt">{t("accessibility.pt")}</option>
                  <option value="en">{t("accessibility.en")}</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
