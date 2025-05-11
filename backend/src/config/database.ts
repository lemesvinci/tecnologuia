// backend/src/config/database.ts
import pgPromise from "pg-promise";
import dotenv from "dotenv";

// carrega variáveis do .env
dotenv.config();

// inicializa o pg-promise
const pgp = pgPromise();

// configurações do banco
const dbConfig = {
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432", 10),
  database: process.env.PG_DATABASE || "tecnologuia",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "admin",
};

// cria conexão
const db = pgp(dbConfig);

// testa conexão
db.connect()
  .then((obj) => {
    console.log("Conectado ao PostgreSQL!");
    obj.done(); // fecha a conexão imediatamente
  })
  .catch((err: Error) => {
    console.error("Erro ao conectar ao banco:", err.message || err);
  });

// cria as tabelas, se ainda não existirem
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

// executa ao inicializar
initTables();

// exporta conexão e pgp
export default db;
export { pgp };
