import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../config/api";
import { Trash2 } from "lucide-react";

interface Area {
  id: number;
  name: string;
  description: string;
  videoLink?: string; // Novo campo para link de videoaula
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  userName: string;
  userId?: number;
  areaId: number;
}

const Comments = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | null>(null); // Mudança para uma única área
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments/areas`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
        console.log("Áreas recebidas:", response.data); // Depuração
        // Adiciona links fictícios para videoaulas (substitua por links reais)
        const areasWithLinks = response.data.map((area: Area) => ({
          ...area,
          videoLink: `https://www.youtube.com/cursoemvideo`, // Exemplo, ajuste conforme necessário
        }));
        setAreas(areasWithLinks);
        if (areasWithLinks.length > 0) {
          setSelectedArea(areasWithLinks[0].id); // Seleciona a primeira área por padrão
        }
      } catch (err: any) {
        console.error("Erro ao carregar áreas:", err);
        setError(err.response?.data.message || "Erro ao carregar áreas");
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea === null) return;

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments`, {
          params: { areaId: selectedArea }, // Usa areaId único
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
        setComments(response.data);
      } catch (err: any) {
        setError(err.response?.data.message || "Erro ao carregar comentários");
      }
    };

    fetchComments();
  }, [selectedArea]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("O comentário não pode estar vazio");
      return;
    }

    if (!selectedArea) {
      setError("Selecione uma área para comentar");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/comments`,
        { content: newComment, areaId: selectedArea }, // Usa areaId único
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      setComments([response.data, ...comments]);
      setNewComment("");
      setSuccess("Comentário adicionado com sucesso");
      setError(null);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      setComments(comments.filter((comment) => comment.id !== commentId));
      setSuccess("Comentário excluído com sucesso");
      setError(null);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    const message =
      err.response?.data.message || "Erro ao processar a requisição";
    if (err.response?.status === 401 || err.response?.status === 403) {
      setError("Sessão expirada. Faça login novamente.");
      logout();
      navigate("/login");
    } else {
      setError(message);
    }
    setSuccess(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Data indisponível"
      : date.toLocaleString("pt-BR", {
          timeZone: "UTC",
        });
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      role="main"
      aria-label="Fórum de Comentários sobre Áreas de TI"
    >
      <h1 className="text-3xl font-bold mb-8" tabIndex={0} aria-level="1">
        Comentários sobre Áreas de TI
      </h1>

      {error && (
        <p className="text-red-600 mb-6" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 mb-6" role="status">
          {success}
        </p>
      )}

      {!isAuthenticated ? (
        <p className="text-gray-600">
          Você precisa estar logado para adicionar ou visualizar comentários.{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
            aria-label="Faça login aqui"
          >
            Faça login aqui
          </Link>
          .
        </p>
      ) : (
        <>
          {/* Seleção de Áreas */}
          <div
            className="mb-8"
            role="navigation"
            aria-label="Seleção de Áreas de TI"
          >
            <h2
              className="text-xl font-semibold mb-4"
              tabIndex={0}
              aria-level="2"
            >
              Escolha uma Área de TI
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {areas.length > 0 ? (
                areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      selectedArea === area.id
                        ? "bg-blue-100 ring-blue-600"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    style={{ minHeight: "60px" }}
                    aria-label={`Selecionar ${area.name}`}
                    aria-pressed={selectedArea === area.id}
                    tabIndex={0}
                  >
                    <span className="text-lg font-medium">{area.name}</span>
                    {area.videoLink && (
                      <a
                        href={area.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-1 text-blue-600 hover:underline"
                        aria-label={`Videoaula sobre ${area.name}`}
                      >
                        Videoaula
                      </a>
                    )}
                  </button>
                ))
              ) : (
                <p role="alert">Carregando áreas...</p>
              )}
            </div>
          </div>

          {/* Formulário para adicionar comentários */}
          <div
            className="bg-white p-6 rounded-lg shadow mb-8"
            role="form"
            aria-label="Adicionar Comentário"
          >
            <h2
              className="text-xl font-semibold mb-4"
              tabIndex={0}
              aria-level="2"
            >
              Adicionar Comentário
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={(e: { target: { value: any; }; }) => setNewComment(e.target.value)}
                placeholder="Digite seu comentário sobre esta área de TI..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black bg-white"
                rows={4}
                aria-label="Digite seu comentário"
                aria-required="true"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={!selectedArea}
                aria-label="Enviar Comentário"
              >
                Enviar Comentário
              </button>
            </form>
          </div>

          {/* Lista de comentários */}
          <div
            className="space-y-6"
            role="region"
            aria-label="Lista de Comentários"
          >
            {comments.length === 0 ? (
              <p className="text-gray-600" role="status">
                Nenhum comentário encontrado para esta área. Seja o primeiro a
                comentar!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-6 rounded-lg shadow"
                  role="article"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold" tabIndex={0}>
                        {comment.userName}
                      </h4>
                      <p className="text-gray-500 text-sm" tabIndex={0}>
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {user?.role === "admin" && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                        title="Excluir comentário"
                        aria-label="Excluir este comentário"
                        tabIndex={0}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700" tabIndex={0}>
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
