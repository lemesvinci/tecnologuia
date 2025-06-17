// frontend/src/pages/Users.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { API_URL } from "../config/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Users = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        });
        if (!response.ok) throw new Error(t("users.fetchError"));
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || t("users.fetchError"));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, user, navigate, t]);

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
        timeZone: "America/Sao_Paulo",
      }).format(date);
    } catch {
      return t("users.dateUnavailable");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center" role="status">
        {t("users.loading")}
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">
          {t("users.unauthorized")}{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
            aria-label={t("users.loginLink")}
          >
            {t("users.loginLink")}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      role="main"
      aria-label={t("users.title")}
    >
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        tabIndex={0}
        aria-level="1"
      >
        {t("users.title")}
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

      <motion.div
        className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                tabIndex={0}
                scope="col"
              >
                {t("users.name")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                tabIndex={0}
                scope="col"
              >
                {t("users.email")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                tabIndex={0}
                scope="col"
              >
                {t("users.createdAt")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                tabIndex={0}
                scope="col"
              >
                {t("users.role")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <motion.tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                variants={rowVariants}
                role="row"
              >
                <td
                  className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                  tabIndex={0}
                >
                  {user.name}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                  tabIndex={0}
                >
                  {user.email}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                  tabIndex={0}
                >
                  {formatDate(user.createdAt)}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                  tabIndex={0}
                >
                  {user.role === "admin" ? t("users.admin") : t("users.user")}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p
            className="text-gray-600 dark:text-gray-300 text-center py-4"
            role="status"
          >
            {t("users.noUsers")}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Users;