// backend/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import { getUsers } from "./controllers/userController";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://tecnologuia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

// Protege rota de listagem de usuários com middleware de autenticação
app.get("/api/users", authMiddleware, getUsers);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
