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
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
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
        setAreas(response.data);
        if (response.data.length > 0) {
          // Selecionar as três primeiras áreas por padrão, se disponíveis
          setSelectedAreas(response.data.slice(0, 3).map((area) => area.id));
        }
      } catch (err: any) {
        setError(err.response?.data.message || "Erro ao carregar áreas");
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedAreas.length === 0) return;

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments`, {
          params: { areaIds: selectedAreas.join(",") }, // Enviar múltiplos areaIds
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
  }, [selectedAreas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("O comentário não pode estar vazio");
      return;
    }

    if (selectedAreas.length < 3) {
      setError("Selecione pelo menos 3 áreas de TI");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/comments`,
        { content: newComment, areaIds: selectedAreas },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Comentários sobre Áreas de TI</h1>

      {error && <p className="text-red-600 mb-6">{error}</p>}
      {success && <p className="text-green-600 mb-6">{success}</p>}

      {!isAuthenticated ? (
        <p className="text-gray-600">
          Você precisa estar logado para adicionar ou visualizar comentários.{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login aqui
          </Link>
          .
        </p>
      ) : (
        <>
          {/* Seleção de Áreas */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Escolha pelo menos 3 Áreas de TI
            </h2>
            <select
              multiple
              value={selectedAreas.map(String)} // Converte para string para compatibilidade
              onChange={(e) =>
                setSelectedAreas(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ minHeight: "150px" }} // Aumenta o tamanho para facilitar múltiplas seleções
              required
            >
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            {selectedAreas.length < 3 && (
              <p className="text-red-600 mt-2">
                Selecione pelo menos 3 áreas para continuar.
              </p>
            )}
          </div>

          {/* Formulário para adicionar comentários */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Adicionar Comentário</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Digite seu comentário sobre estas áreas de TI..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={selectedAreas.length < 3}
              >
                Enviar Comentário
              </button>
            </form>
          </div>

          {/* Lista de comentários */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-600">
                Nenhum comentário encontrado para estas áreas. Seja o primeiro a
                comentar!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{comment.userName}</h4>
                      <p className="text-gray-500 text-sm">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {(comment.userId === user?.id ||
                      user?.role === "admin") && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Excluir comentário"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
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
