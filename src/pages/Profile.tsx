import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Book, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  bio: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'gradient'>('light'); // Estado para o tema

  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: 'Campo Grande, MS - Brasil',
    occupation: 'Desenvolvedor Web',
    bio: 'Entusiasta de tecnologia e desenvolvimento web. Adoro aprender novas tecnologias e compartilhar conhecimento.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'gradient') => {
    setTheme(newTheme);
    // Opcional: Salvar tema no localStorage para persistência
    localStorage.setItem('theme', newTheme);
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <div className="animate-fade-in">
          <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="name"
                label="Nome"
                type="text"
                value={profileData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                id="email"
                label="Email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
                required
              />
              <FormInput
                id="phone"
                label="Telefone"
                type="tel"
                value={profileData.phone}
                onChange={handleChange}
              />
              <FormInput
                id="location"
                label="Localização"
                type="text"
                value={profileData.location}
                onChange={handleChange}
              />
              <FormInput
                id="occupation"
                label="Profissão"
                type="text"
                value={profileData.occupation}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Biografia
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={handleChange}
                  className="input"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSaving}>
                <Save size={18} className="mr-2" />
                Salvar alterações
              </Button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mr-6 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-primary-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-gray-600">{profileData.occupation}</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            Editar perfil
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`card p-6 ${theme === 'dark' ? 'bg-gray-900 text-yellow-300' : theme === 'gradient' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white' : ''}`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User size={20} className="mr-2 text-primary-600" />
              Informações pessoais
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <Mail size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{profileData.email}</p>
                </div>
              </li>
              <li className="flex">
                <Phone size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p>{profileData.phone || 'Não informado'}</p>
                </div>
              </li>
              <li className="flex">
                <MapPin size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p>{profileData.location}</p>
                </div>
              </li>
              <li className="flex">
                <Briefcase size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Profissão</p>
                  <p>{profileData.occupation}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={`card p-6 ${theme === 'dark' ? 'bg-gray-900 text-yellow-300' : theme === 'gradient' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white' : ''}`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Book size={20} className="mr-2 text-primary-600" />
              Biografia
            </h3>
            <p className="text-gray-700">{profileData.bio}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsContent = () => {
    return (
      <div className={`card p-6 animate-fade-in ${theme === 'dark' ? 'bg-gray-900 text-yellow-300' : theme === 'gradient' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white' : ''}`}>
        <h3 className="text-lg font-semibold mb-6">Configurações</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium mb-3">Notificações</h4>
            <div className="space-y-3">
              {['Email', 'Push', 'SMS'].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    id={`notification-${type.toLowerCase()}`}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked={type === 'Email'}
                  />
                  <label htmlFor={`notification-${type.toLowerCase()}`} className="ml-2 block text-sm text-gray-700">
                    Notificações via {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium mb-3">Tema</h4>
            <div className="flex space-x-4">
              <button
                className={`w-8 h-8 bg-gray-900 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-300' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                onClick={() => handleThemeChange('dark')}
                aria-label="Tema escuro"
              ></button>
              <button
                className={`w-8 h-8 bg-white rounded-full border-2 ${theme === 'light' ? 'border-gray-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                onClick={() => handleThemeChange('light')}
                aria-label="Tema claro"
              ></button>
              <button
                className={`w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full border-2 ${theme === 'gradient' ? 'border-white' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-white`}
                onClick={() => handleThemeChange('gradient')}
                aria-label="Tema gradiente"
              ></button>
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium mb-3">Idioma</h4>
            <select className="input">
              <option>Português</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div className="pt-4 border-t">
            <Button>Salvar configurações</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${theme === 'dark' ? 'text-yellow-300' : theme === 'gradient' ? 'text-white' : ''}`} style={theme === 'gradient' ? { background: 'linear-gradient(to right, #3b82f6, #9333ea)' } : {}}>
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden mb-8 ${theme === 'dark' ? 'bg-gray-900' : theme === 'gradient' ? 'bg-transparent' : ''}`}>
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'profile'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'settings'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('settings')}
          >
            Configurações
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'settings' && renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;