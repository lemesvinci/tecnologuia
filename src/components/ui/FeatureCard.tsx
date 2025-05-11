// frontend/src/components/ui/FeatureCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.FC<any>;
  title: string;
  description: string;
  delay: number;
  to: string;
  image?: string; // Nova propriedade para a imagem
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, to, image }) => {
  return (
    <Link to={to} className="block">
      <div
        className="card p-6 glass hover:shadow-xl transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${delay}ms` }}
      >
        {image && (
          <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg mb-4" />
        )}
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-primary-600 mr-3" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;