// src/components/ui/FeatureCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  icon: React.FC<any>;
  title: string;
  description: string;
  to: string;
  image?: string;
  videoLink?: string; // Corrigido: Adicionada propriedade
  accessibilityOptions: {
    highContrast: boolean;
    largeText: boolean;
    darkMode: boolean;
    reducedMotion: boolean;
    colorBlind: boolean;
    language: string;
  };
  "aria-label": string;
}

// Variantes para animação com Framer Motion
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
    transition: { duration: 0.3 },
  },
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  to,
  image,
  videoLink,
  accessibilityOptions,
  "aria-label": ariaLabel,
}) => {
  const { t } = useTranslation();

  return (
    <Link to={to} className="block" aria-label={ariaLabel}>
      <motion.div
        variants={accessibilityOptions.reducedMotion ? {} : cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover={accessibilityOptions.reducedMotion ? {} : "hover"}
        viewport={{ once: true }}
        className={`card p-6 glass hover:shadow-xl transition-all duration-300 ${
          accessibilityOptions.highContrast
            ? "bg-gray-900 text-yellow-300"
            : accessibilityOptions.darkMode
            ? "bg-gray-800 text-gray-100"
            : ""
        }`}
      >
        {image && (
          <img
            src={image}
            alt={t("featureCard.imageAlt", { title })}
            className="w-full h-40 object-cover rounded-t-lg mb-4"
            loading="lazy"
          />
        )}
        <div className="flex items-center mb-4">
          <Icon
            className={`w-8 h-8 mr-3 ${
              accessibilityOptions.highContrast
                ? "text-yellow-300"
                : accessibilityOptions.darkMode
                ? "text-primary-400"
                : "text-primary-600"
            } ${accessibilityOptions.largeText ? "w-10 h-10" : ""}`}
          />
          <h3
            className={`text-xl font-semibold ${
              accessibilityOptions.largeText ? "text-2xl" : ""
            }`}
            tabIndex={0}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-gray-600 mb-2 ${
            accessibilityOptions.largeText
              ? "text-lg"
              : accessibilityOptions.darkMode
              ? "text-gray-300"
              : ""
          }`}
          tabIndex={0}
        >
          {description}
        </p>
        {videoLink && (
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 block mt-2 ${
              accessibilityOptions.highContrast
                ? "text-yellow-300"
                : accessibilityOptions.darkMode
                ? "text-blue-400"
                : ""
            }`}
            aria-label={t("featureCard.videoLink")}
          >
            {t("featureCard.videoLink")}
          </a>
        )}
      </motion.div>
    </Link>
  );
};

export default FeatureCard;