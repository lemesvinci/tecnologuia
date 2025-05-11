// frontend/src/pages/Comments.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../config/api";
import { Trash2 } from "lucide-react"; // Ícone de lixeira

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  userName: string;
  userId?: number; // Adicionar userId para verificar o autor
}

const Comments = () => {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  console.log("isAuthenticated:", isAuthenticated); // Log 1
  console.log("user:", user); // Log 2

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments`);
        setComments(response.data);
      } catch (err: any) {
        setError(err.response?.data.message || "Erro ao carregar comentários");
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("O comentário não pode estar vazio");
      return;
    }

    console.log("Token atual:", localStorage.getItem("token")); // Log 1
    console.log("User atual:", user); // Log 2

    try {
      const response = await axios.post(
        `${API_URL}/api/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Novo comentário criado:", response.data); // Log 3

      setComments([response.data, ...comments]);
      setNewComment("");
      setSuccess("Comentário adicionado com sucesso");
      setError(null);
    } catch (err: any) {
      setError(err.response?.data.message || "Erro ao adicionar comentário");
      setSuccess(null);
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
        },
      });

      // Atualizar a lista de comentários após a exclusão
      setComments(comments.filter((comment) => comment.id !== commentId));
      setSuccess("Comentário excluído com sucesso");
      setError(null);
    } catch (err: any) {
      setError(err.response?.data.message || "Erro ao excluir comentário");
      setSuccess(null);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Data indisponível" : date.toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Comentários</h1>

      {error && <p className="error-message mb-6">{error}</p>}
      {success && <p className="text-green-600 mb-6">{success}</p>}

      {!isAuthenticated ? (
        <p className="text-gray-600">
          Você precisa estar logado para adicionar ou visualizar comentários.{" "}
          <Link to="/login" className="text-primary-600 hover:underline">
            Faça login aqui
          </Link>
          .
        </p>
      ) : (
        <>
          {/* Formulário para adicionar comentários */}
          <div className="card p-6 glass mb-8">
            <h2 className="text-xl font-semibold mb-4">Adicionar Comentário</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Digite seu comentário..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                rows={4}
              />
              <button type="submit" className="btn-primary mt-4">
                Enviar Comentário
              </button>
            </form>
          </div>

          {/* Lista de comentários */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-600">
                Nenhum comentário encontrado. Seja o primeiro a comentar!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="card p-6 glass">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{comment.userName}</h4>
                      <p className="text-gray-500 text-sm">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {/* Botão de exclusão */}
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
