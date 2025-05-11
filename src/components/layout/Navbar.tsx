// frontend/src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  UserCircle,
  Home,
  MessageSquare,
  Users,
  Cpu,
  Smartphone,
  Code,
  BookOpen,
  Zap,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-black">
                inst<span className="text-teal-500">ed.</span>
              </span>
              <div className="w-px h-6 bg-gray-400" />
              <span className="text-2xl font-bold text-primary-600">
                Tecnologuia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Início
              </Link>
              <Link
                to="/hardware"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/hardware"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Hardware
              </Link>
              <Link
                to="/programacao"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/programacao"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Programação
              </Link>
              <Link
                to="/mobile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/mobile"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Mobile
              </Link>
              <Link
                to="/cursos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/cursos"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Cursos
              </Link>
              <Link
                to="/noticias"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/noticias"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Notícias
              </Link>
              <Link
                to="/comunidade"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/comunidade"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Comunidade
              </Link>
              <Link
                to="/comments"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/comments"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Comentários
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/users"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/users"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  Usuários
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === "/profile"
                        ? "text-primary-600 font-semibold"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    Perfil
                  </Link>
                  <button onClick={logout} className="btn-outline">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline">
                    Entrar
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Home size={20} className="mr-2" />
              Início
            </Link>
            <Link
              to="/hardware"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Cpu size={20} className="mr-2" />
              Hardware
            </Link>
            <Link
              to="/programacao"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Code size={20} className="mr-2" />
              Programação
            </Link>
            <Link
              to="/mobile"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Smartphone size={20} className="mr-2" />
              Mobile
            </Link>
            <Link
              to="/cursos"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <BookOpen size={20} className="mr-2" />
              Cursos
            </Link>
            <Link
              to="/noticias"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Zap size={20} className="mr-2" />
              Notícias
            </Link>
            <Link
              to="/comunidade"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <Users size={20} className="mr-2" />
              Comunidade
            </Link>
            <Link
              to="/comments"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              <MessageSquare size={20} className="mr-2" />
              Comentários
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/users"
                className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
              >
                <Users size={20} className="mr-2" />
                Usuários
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
                >
                  <UserCircle size={20} className="mr-2" />
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors text-red-600"
                >
                  <LogIn size={20} className="mr-2 transform rotate-180" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
                >
                  <LogIn size={20} className="mr-2" />
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-3 mt-2 text-center rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;