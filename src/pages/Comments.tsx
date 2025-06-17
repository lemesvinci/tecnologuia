// frontend/src/components/Comments.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { API_URL } from "../config/api";
import { Trash2 } from "lucide-react";

interface Area {
  id: number;
  name: string;
  description: string;
  videoLink?: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user_name: string;
  userId?: number;
  areaId: number;
}

const commentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Comments = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    highContrast: false,
    largeText: false,
    darkMode: false,
    reducedMotion: false,
    colorBlind: false,
    language: "pt",
  });

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments/areas`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });
        console.log("Áreas recebidas:", response.data);
        const areasWithLinks = response.data.map((area: Area) => ({
          ...area,
          videoLink: `https://www.youtube.com/cursoemvideo`, // Ajuste com links reais
        }));
        setAreas(areasWithLinks);
        if (areasWithLinks.length > 0) {
          setSelectedArea(areasWithLinks[0].id);
        }
      } catch (err: any) {
        console.error("Erro ao carregar áreas:", err);
        setError(t("comments.fetchAreasError"));
      }
    };

    fetchAreas();
  }, [t]);

  useEffect(() => {
    if (selectedArea === null) return;

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments`, {
          params: { areaId: selectedArea },
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });
        console.log("Comentários recebidos:", response.data);
        setComments(response.data);
      } catch (err: any) {
        setError(t("comments.fetchCommentsError"));
      }
    };

    fetchComments();
  }, [selectedArea, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError(t("comments.emptyComment"));
      return;
    }

    if (!selectedArea) {
      setError(t("comments.noAreaSelected"));
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/comments`,
        { content: newComment, areaId: selectedArea },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      setComments([response.data, ...comments]);
      setNewComment("");
      setSuccess(t("comments.addSuccess"));
      setError(null);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm(t("comments.deleteConfirm"))) {
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
      setSuccess(t("comments.deleteSuccess"));
      setError(null);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    const message = err.response?.data.message || t("comments.requestError");
    if (err.response?.status === 401 || err.response?.status === 403) {
      setError(t("comments.sessionExpired"));
      logout();
      navigate("/login");
    } else {
      setError(message);
    }
    setSuccess(null);
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Data inválida");
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return t("comments.dateUnavailable");
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="main"
      aria-label={t("comments.title")}
    >
      <motion.h1
        className={`text-3xl font-bold mb-8 ${
          accessibilityOptions.largeText ? "text-4xl" : ""
        }`}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        tabIndex={0}
        aria-level="1"
      >
        {t("comments.title")}
      </motion.h1>

      {error && (
        <motion.p
          className="text-red-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
      {success && (
        <motion.p
          className="text-green-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="status"
        >
          {success}
        </motion.p>
      )}

      {!isAuthenticated ? (
        <p className="text-gray-600">
          {t("comments.unauthorized")}{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
            aria-label={t("comments.loginLink")}
          >
            {t("comments.loginLink")}
          </Link>
          .
        </p>
      ) : (
        <>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="navigation"
            aria-label={t("comments.selectArea")}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                accessibilityOptions.largeText ? "text-2xl" : ""
              }`}
              tabIndex={0}
              aria-level="2"
            >
              {t("comments.selectArea")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {areas.length > 0 ? (
                areas.map((area) => (
                  <motion.button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      selectedArea === area.id
                        ? "bg-blue-100 ring-blue-600"
                        : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    } ${
                      accessibilityOptions.highContrast
                        ? "bg-gray-900 text-yellow-300"
                        : ""
                    }`}
                    style={{ minHeight: "60px" }}
                    aria-label={t("comments.selectAreaLabel", {
                      name: area.name,
                    })}
                    aria-pressed={selectedArea === area.id}
                    tabIndex={0}
                    whileHover={
                      accessibilityOptions.reducedMotion ? {} : { scale: 1.05 }
                    }
                  >
                    <span
                      className={`text-lg font-medium ${
                        accessibilityOptions.highContrast
                          ? "text-yellow-300"
                          : accessibilityOptions.darkMode
                          ? "text-gray-100"
                          : "text-gray-900"
                      } ${accessibilityOptions.largeText ? "text-xl" : ""}`}
                    >
                      {area.name}
                    </span>
                    {area.videoLink && (
                      <a
                        href={area.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block mt-1 hover:underline ${
                          accessibilityOptions.highContrast
                            ? "text-yellow-300"
                            : accessibilityOptions.darkMode
                            ? "text-blue-400"
                            : "text-blue-600"
                        }`}
                        aria-label={t("comments.videoLinkLabel", {
                          name: area.name,
                        })}
                      >
                        {t("comments.videoLink")}
                      </a>
                    )}
                  </motion.button>
                ))
              ) : (
                <p role="alert">{t("comments.loadingAreas")}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            className={`card p-6 glass mb-8 ${
              accessibilityOptions.highContrast
                ? "bg-gray-900 text-yellow-300"
                : accessibilityOptions.darkMode
                ? "bg-gray-800"
                : "bg-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="form"
            aria-label={t("comments.addComment")}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                accessibilityOptions.largeText ? "text-2xl" : ""
              } ${accessibilityOptions.highContrast ? "text-yellow-300" : ""}`}
              tabIndex={0}
              aria-level="2"
            >
              {t("comments.addComment")}
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t("comments.placeholder")}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  accessibilityOptions.highContrast
                    ? "bg-gray-800 text-yellow-300 border-yellow-300"
                    : accessibilityOptions.darkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "text-black bg-white"
                } ${accessibilityOptions.largeText ? "text-lg" : ""}`}
                rows={4}
                aria-label={t("comments.commentInput")}
                aria-required="true"
              />
              <button
                type="submit"
                className={`mt-4 px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  accessibilityOptions.highContrast
                    ? "bg-yellow-300 text-black hover:bg-yellow-400"
                    : accessibilityOptions.darkMode
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-600 text-white"
                }`}
                disabled={!selectedArea}
                aria-label={t("comments.submitComment")}
              >
                {t("comments.submitComment")}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={
              accessibilityOptions.reducedMotion
                ? {}
                : { visible: { transition: { staggerChildren: 0.2 } } }
            }
            role="region"
            aria-label={t("comments.commentList")}
          >
            {comments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300" role="status">
                {t("comments.noComments")}
              </p>
            ) : (
              comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  className={`card p-6 glass ${
                    accessibilityOptions.highContrast
                      ? "bg-gray-900 text-yellow-300"
                      : accessibilityOptions.darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                  variants={
                    accessibilityOptions.reducedMotion ? {} : commentVariants
                  }
                  role="article"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4
                        className={`font-semibold ${
                          accessibilityOptions.highContrast
                            ? "text-yellow-300"
                            : accessibilityOptions.darkMode
                            ? "text-gray-100"
                            : "text-black"
                        } ${accessibilityOptions.largeText ? "text-lg" : ""}`}
                        tabIndex={0}
                      >
                        {comment.user_name || t("comments.unknownUser")}
                      </h4>
                      <p
                        className={`text-sm ${
                          accessibilityOptions.highContrast
                            ? "text-yellow-300"
                            : accessibilityOptions.darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                        tabIndex={0}
                      >
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {user?.role === "admin" && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className={`text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 ${
                          accessibilityOptions.highContrast
                            ? "text-yellow-300 hover:text-yellow-400"
                            : ""
                        }`}
                        title={t("comments.deleteComment")}
                        aria-label={t("comments.deleteComment")}
                        tabIndex={0}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <p
                    className={`${
                      accessibilityOptions.highContrast
                        ? "text-yellow-300"
                        : accessibilityOptions.darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    } ${accessibilityOptions.largeText ? "text-lg" : ""}`}
                    tabIndex={0}
                  >
                    {comment.content}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Comments;