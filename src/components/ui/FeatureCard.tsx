import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.FC<any>;
  title: string;
  description: string;
  delay: number;
  to: string;
  image?: string; // Propriedade para a imagem
  videoLink?: string; // Nova propriedade para o link de videoaula
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, to, image, videoLink }) => {
  return (
    <Link to={to} className="block" aria-label={`Saiba mais sobre ${title}`}>
      <div
        className="card p-6 glass hover:shadow-xl transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${delay}ms` }}
      >
        {image && (
          <img src={image} alt={`Imagem representando ${title}`} className="w-full h-32 object-cover rounded-t-lg mb-4" />
        )}
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-primary-600 mr-3" />
          <h3 className="text-xl font-semibold" tabIndex={0}>{title}</h3>
        </div>
        <p className="text-gray-600 mb-2" tabIndex={0}>{description}</p>
        {videoLink && (
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 block mt-2"
            aria-label={`Assistir videoaula sobre ${title}`}
          >
            Videoaula
          </a>
        )}
      </div>
    </Link>
  );
};

export default FeatureCard;