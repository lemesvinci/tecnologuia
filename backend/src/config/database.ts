import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();
const pgp = pgPromise();

// Configuração do banco
let dbConfig;

if (process.env.NODE_ENV === "production") {
  // Produção: usa DATABASE_URL
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não está definido nas variáveis de ambiente");
  }
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
} else {
  // Desenvolvimento: usa PG_* variáveis
  dbConfig = {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432", 10),
    database: process.env.PG_DB || "tecnologuia",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "admin",
  };
}

const db = pgp(dbConfig);

db.connect()
  .then((obj) => {
    console.log("Conectado ao PostgreSQL!");
    obj.done();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err.message || err);
  });

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
        role TEXT DEFAULT 'user',
        reset_token TEXT,
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

initTables();

export default db;
export { pgp };