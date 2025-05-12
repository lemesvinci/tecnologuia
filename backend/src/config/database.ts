import pgPromise from "pg-promise";
import dotenv from "dotenv";

// Carrega variáveis do .env
dotenv.config();

// Inicializa o pg-promise
const pgp = pgPromise();

// Configurações do banco usando connection string
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

// Valida a presença de DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definido nas variáveis de ambiente");
}

// Cria conexão
const db = pgp(dbConfig);

// Testa conexão
db.connect()
  .then((obj) => {
    console.log("Conectado ao PostgreSQL!");
    obj.done(); // Fecha a conexão imediatamente
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err.message || err);
  });

// Cria as tabelas, se ainda não existirem
const initTables = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone TEXT,
        location TEXT,
        occupation TEXT,
        bio TEXT,
        role TEXT DEFAULT 'user'
      );
    `);

    await db.none(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        createdAt TIMESTAMP NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Tabelas verificadas/criadas com sucesso");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
};

// Executa ao inicializar
initTables();

// Exporta conexão e pgp
export default db;
export { pgp };